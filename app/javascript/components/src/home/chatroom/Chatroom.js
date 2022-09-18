import React, { useEffect, useRef,useState } from "react";
import classes from './style.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import {AiOutlineSend} from "react-icons/ai";
import {GoTrashcan} from "react-icons/go";
import store from "../../../../redux/configureStore";
const GET_MESSAGE_FROM_WEBSOCKET = "GET_MESSAGE_FROM_WEBSOCKET";
const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";

const Chatroom = (props)=>{
    const user_id = useSelector((state)=>state.userInfo.userID);
    const messages = useSelector((state)=> state.chatroomMessages);
    const onlineUsers = useSelector((state)=>state.onlineUsers);
    const messagesListRefMobile = useRef(null);
    const messagesListRef = useRef(null);
    const usersNames = useSelector((state)=>state.usersNames)|| [];
    const messageRef = useRef(null);
    const [errorMessage,setErrorMessage] = useState("");
    const errorMessageRef = useRef(null);
    const deleteMessageHandler = (messageId)=>{
        store.dispatch({type:"DELETE_MESSAGE",id:messageId});
    }

useEffect(()=>{
    props.onlineUsers.onopen = (event)=>{
        const subscribeMsg = {"command":"subscribe","identifier"
        :"{\"channel\":\"SessionChannel\"}"}
       props.onlineUsers.send(JSON.stringify(subscribeMsg))
       
    }
    props.socket.onopen = (event)=>{
        const subscribeMsg = {"command":"subscribe","identifier"
           :"{\"channel\":\"ChatroomChannel\"}"}
          props.socket.send(JSON.stringify(subscribeMsg))
          }
      const messlistInterval = setInterval(()=>{
          if(messagesListRef.current){
          messagesListRef.current.scrollTop =999999;
          }
          if(messagesListRefMobile.current){
          messagesListRefMobile.current.scrollTop = 999999;
          }
      }
          
      ,1);
      setTimeout(()=>{
          clearInterval(messlistInterval);
      },1000)
return ()=>{
    props.socket.close();
    props.onlineUsers.close();
}
},[]);
useEffect(()=>{
    props.onlineUsers.addEventListener('message',(event)=>{
        if(JSON.parse(event.data).message && (typeof(JSON.parse(event.data).message)!="number")){

            if(JSON.parse(event.data).message.action === "all"){
                store.dispatch({type:"GET_ONLINE_USERS",data:JSON.parse(event.data).message.onlineUsers})


        }else if(JSON.parse(event.data).message.action === "create"){
                console.log(JSON.parse(event.data).message.onlineUsers);
                store.dispatch({type:"GET_ONLINE_USER",data:JSON.parse(event.data).message.onlineSession})
            }else {
                console.log(JSON.parse(event.data).message);
                store.dispatch({type:"REMOVE_ONLINE_USER",data:JSON.parse(event.data).message.onlineSession})
            }
        }
    });
    props.socket.addEventListener('message', (event) => {
        
    if(JSON.parse(event.data).message && (typeof(JSON.parse(event.data).message)!="number")){
        if(JSON.parse(event.data).message.valid){
            console.log(JSON.parse(event.data)); 
            if(JSON.parse(event.data).message.action === "create"){
            setErrorMessage("");
            store.dispatch({type:GET_MESSAGE_FROM_WEBSOCKET,message:JSON.parse(event.data).message});
            }else {
                setErrorMessage("");
            store.dispatch({type:DELETE_MESSAGE_SUCCESS,id:JSON.parse(event.data).message.messageID});
            }
      if(messagesListRef.current){

            setTimeout(()=>messagesListRef.current.scrollTop+=  999999,100);
        }
        if( messagesListRefMobile.current){

            setTimeout(()=>messagesListRefMobile.current.scrollTop+=  999999,100);
        }
    }else {
        errorMessageRef.current.style.display = 'block'
        setErrorMessage("Please make sure to enter a valid message!!");
     }
    }
    
  });
  if(!messages.length){
    store.dispatch({type:"GET_MESSAGES_FROM_API"});

  }
},[user_id]);
    const sendMessageHandler  = ()=>{
        if(!( messageRef.current.value === "")){
            store.dispatch({type:"SEND_MESSAGE_TO_BACK_END",body:messageRef.current.value,user_id})
            messageRef.current.value = "";
}else {
    errorMessageRef.current.style.display = "block";
    setErrorMessage("Please make sure to enter a valid message!!");

}
}
const sendMessageHandlerInput = (event)=>{
    if(event.key === "Enter"){
        sendMessageHandler();
    }
}
return(<div className={classes.chatroomContainer}>
    <div className={classes.imageContainer}>
    </div>
    <h2>Say Something</h2>
    <div className={classes.chatBoxes}>
    <div className={classes.onlineUsersContainer}>
        <div className={classes.onlineUsers}>
        <h2 className={classes.onlineUsersTitle}>Online Users</h2>
        <ul >
            {onlineUsers.map((element)=><li key={uuidv4()}>{element.username} &nbsp; <div></div></li>)}
        </ul>
        </div>
    </div>
    <div className={classes.messagesSection}>
        <ul className={classes.desktop } ref={messagesListRef}  >
            {messages.map((message)=>
            <li key={uuidv4()} className={classes.messageTextContainer}>{message.sentBy} :&nbsp; 
               
                    {message.text.match(/.{1,50}/g).map((el)=><React.Fragment key={uuidv4()}>{el}<br/></React.Fragment>)}{(message.user_id === user_id) &&<GoTrashcan className={classes.trashIcon} onClick={()=>deleteMessageHandler(message.id)}/>}
           
            </li>)}
        </ul>
        <ul className={classes.mobile} ref={messagesListRefMobile} >
            {messages.map((message)=>
            <li key={uuidv4()} className={classes.messageTextContainer}>{message.sentBy} :&nbsp; 
               
                    {message.text.match(/.{1,21}/g).map((el)=><React.Fragment key={uuidv4()}>{el}<br/></React.Fragment>)}{(message.user_id === user_id) &&<GoTrashcan className={classes.trashIcon}  onClick={()=>deleteMessageHandler(message.id)}/>}
           
            </li>)}
        </ul>
        <p className={classes.errorMessage} ref={errorMessageRef}>{errorMessage}</p>
        <div className={classes.sendMessageContainer}>
        <input placeholder="Enter a Message" className={classes.sendMessage} onKeyDown = {sendMessageHandlerInput} ref={messageRef}/>
        <button onClick={sendMessageHandler}><AiOutlineSend/></button>
        </div>
    </div>
    </div>
</div>);





};
export default Chatroom;