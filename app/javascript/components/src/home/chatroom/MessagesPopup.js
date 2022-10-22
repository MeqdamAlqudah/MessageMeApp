import { AiOutlineSend } from 'react-icons/ai';
import { GoTrashcan } from 'react-icons/go';
import { useState } from 'react';
import classes from './style.module.css';

const MessagePopup = () => (
  <div className={classes.messagesSection}>
    <ul className={classes.desktop} ref={messagesListRef}>
      {messages.map((message) => (
        <li key={uuidv4()} className={classes.messageTextContainer}>
          {message.sentBy}
          {' '}
          :&nbsp;

          {message.text.match(/.{1,50}/g).map((el) => (
            <React.Fragment key={uuidv4()}>
              {el}
              <br />
            </React.Fragment>
          ))}
          {(message.user_id === userID)
                && (
                <GoTrashcan
                  className={classes.trashIcon}
                  onClick={() => deleteMessageHandler(message.id)}
                />
                )}

        </li>
      ))}
    </ul>
    <ul className={classes.mobile} ref={messagesListRefMobile}>
      {messages.map((message) => (
        <li key={uuidv4()} className={classes.messageTextContainer}>
          {message.sentBy}
          {' '}
          :&nbsp;

          {message.text.match(/.{1,21}/g).map((el) => (
            <React.Fragment key={uuidv4()}>
              {el}
              <br />
            </React.Fragment>
          ))}
          {(message.user_id === userID)
                    && (
                    <GoTrashcan
                      className={classes.trashIcon}
                      onClick={() => deleteMessageHandler(message.id)}
                    />
                    )}

        </li>
      ))}
    </ul>
    <p className={classes.errorMessage} ref={errorMessageRef}>{errorMessage}</p>
    <div className={classes.sendMessageContainer}>
      <label style={{ display: 'none' }} htmlFor="EnterMessage">Enter Message</label>
      <input placeholder="Enter a Message" aria-label="EnterMessage" name="EnterMessage" className={classes.sendMessage} onKeyDown={sendMessageHandlerInput} ref={messageRef} />
      <button type="button" aria-label="EnterMessage" onClick={sendMessageHandler}><AiOutlineSend /></button>
    </div>
  </div>
);

export default MessagePopup;
