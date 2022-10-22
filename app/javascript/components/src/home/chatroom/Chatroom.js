import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../../../redux/configureStore';

const GET_MESSAGE_FROM_WEBSOCKET = 'GET_MESSAGE_FROM_WEBSOCKET';
const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';

const Chatroom = (props) => {
  const userID = useSelector((state) => state.userInfo.userID);
  const messages = useSelector((state) => state.chatroomMessages);
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const messagesListRefMobile = useRef(null);
  const messagesListRef = useRef(null);
  const messageRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const errorMessageRef = useRef(null);
  const deleteMessageHandler = (messageId) => {
    store.dispatch({ type: 'DELETE_MESSAGE', id: messageId });
  };

  useEffect(() => {
    const { onlineUsers, socket } = props;
    onlineUsers.onopen = () => {
      const subscribeMsg = { command: 'subscribe', identifier: '{"channel":"SessionChannel"}' };
      onlineUsers.send(JSON.stringify(subscribeMsg));
    };
    socket.onopen = () => {
      const subscribeMsg = { command: 'subscribe', identifier: '{"channel":"ChatroomChannel"}' };
      socket.send(JSON.stringify(subscribeMsg));
    };
    const messlistInterval = setInterval(() => {
      if (messagesListRef.current) {
        messagesListRef.current.scrollTop = 999999;
      }
      if (messagesListRefMobile.current) {
        messagesListRefMobile.current.scrollTop = 999999;
      }
    },
    1);
    setTimeout(() => {
      clearInterval(messlistInterval);
    }, 1000);
    return () => {
      socket.close();
      onlineUsers.close();
    };
  }, []);
  useEffect(() => {
    const { socket, onlineUsers } = props;
    onlineUsers.addEventListener('message', (event) => {
      if (JSON.parse(event.data).message && (typeof (JSON.parse(event.data).message) !== 'number')) {
        if (JSON.parse(event.data).message.action === 'all') {
          store.dispatch({ type: 'GET_ONLINE_USERS', data: JSON.parse(event.data).message.onlineUsers });
        } else if (JSON.parse(event.data).message.action === 'create') {
          store.dispatch({ type: 'GET_ONLINE_USER', data: JSON.parse(event.data).message.online_session });
        } else {
          store.dispatch({ type: 'REMOVE_ONLINE_USER', data: JSON.parse(event.data).message.online_session });
        }
      }
    });
    socket.addEventListener('message', (event) => {
      // console.log(JSON.parse(event.data));
      if (JSON.parse(event.data).message && (typeof (JSON.parse(event.data).message) !== 'number')) {
        if (JSON.parse(event.data).message.valid) {
          if (JSON.parse(event.data).message.action === 'create') {
            setErrorMessage('');
            store.dispatch({
              type: GET_MESSAGE_FROM_WEBSOCKET,
              message: JSON.parse(event.data).message,
            });
          } else {
            setErrorMessage('');
            store.dispatch({
              type: DELETE_MESSAGE_SUCCESS,
              id: JSON.parse(event.data).message.messageID,
            });
          }
          if (messagesListRef.current) {
            setTimeout(() => { messagesListRef.current.scrollTop += 999999; }, 100);
          }
          if (messagesListRefMobile.current) {
            setTimeout(() => { messagesListRefMobile.current.scrollTop += 999999; }, 100);
          }
        } else {
          errorMessageRef.current.style.display = 'block';
          setErrorMessage('Please make sure to enter a valid message!!');
        }
      }
    });
    if (!messages.length) {
      store.dispatch({ type: 'GET_MESSAGES_FROM_API' });
      store.dispatch({ type: 'GET_ONLINE_USERS_FROM_API' });
    }
  }, [userID]);
  const sendMessageHandler = () => {
    if (!(messageRef.current.value === '')) {
      store.dispatch({ type: 'SEND_MESSAGE_TO_BACK_END', body: messageRef.current.value, user_id: userID });
      messageRef.current.value = '';
    } else {
      errorMessageRef.current.style.display = 'block';
      setErrorMessage('Please make sure to enter a valid message!!');
    }
  };
  const sendMessageHandlerInput = (event) => {
    if (event.key === 'Enter') {
      sendMessageHandler();
    }
  };
  return (
    <div className={classes.chatroomContainer}>
      <div className={classes.imageContainer} />
      <h2>Say Something</h2>
      <div className={classes.chatBoxes}>
        <div className={classes.onlineUsersContainer}>
          <div className={classes.onlineUsers}>
            <h2 className={classes.onlineUsersTitle}>Online Users</h2>
            <ul>
              {onlineUsers.map((element) => (
                <li key={uuidv4()}>
                  {element.username}
                  {' '}
&nbsp;
                  {' '}
                  <div />
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

Chatroom.propTypes = {
  // eslint-disable-next-line  react/forbid-prop-types
  onlineUsers: PropTypes.object,
  // eslint-disable-next-line  react/forbid-prop-types
  socket: PropTypes.object,
};

Chatroom.defaultProps = {
  onlineUsers: {},
  socket: {},
};
export default Chatroom;
