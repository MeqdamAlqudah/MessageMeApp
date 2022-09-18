import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import axios from "axios";
const initialState = {
    userInfo:  JSON.parse(sessionStorage.getItem('userInfo')) || {},
    chatroomMessages:[],
    onlineUsers:[],
};
const SEND_MESSAGE_TO_BACK_END = "SEND_MESSAGE_TO_BACK_END";
const SEND_MESSAGE ="SEND_MESSAGE";
const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
const LOGOUT_USER ="LOGOUT_USER";
const REQUEST_LOGOUT_USER ="REQUEST_LOGOUT_USER";
const GET_ONLINE_USER = "GET_ONLINE_USER";
const REMOVE_ONLINE_USER = "REMOVE_ONLINE_USER";
const GET_USER_INFO="GET_USER_INFO";
const GET_MESSAGES_FROM_API = "GET_MESSAGES_FROM_API";
const REQUEST_MESSAGES ="REQUEST_MESSAGES";
const GET_ONLINE_USERES ="GET_ONLINE_USERES"
const DELETE_MESSAGE = "DELETE_MESSAGE";
const DELETE_MESSAGE_SUCCESS ="DELETE_MESSAGE_SUCCESS"; 
const SIGN_UP_USER = "SIGN_UP_USER";
const GET_MESSAGE_FROM_WEBSOCKET = "GET_MESSAGE_FROM_WEBSOCKET";
const GET_ONLINE_USERS = "GET_ONLINE_USERS";
const rootReducer = (state = initialState,action)=>{
    switch(action.type){
        case GET_USER_INFO_REQUEST:
            sessionStorage.setItem('userInfo',JSON.stringify(action.json.userInfo));
            return {...state,userInfo: action.json.userInfo};
        case LOGOUT_USER:
            sessionStorage.removeItem('userInfo');
            return initialState;
        case SEND_MESSAGE:
            return {...state,chatroomMessages:[...state.chatroomMessages,action.message]}
        case REQUEST_MESSAGES:
            return {...state,chatroomMessages:[...state.chatroomMessages,...action.data]}
        case DELETE_MESSAGE_SUCCESS:
            return {...state,chatroomMessages:state.chatroomMessages.filter((message)=>message.id != action.id)}
        case SIGN_UP_USER:
            return {...state,userInfo:action.data}
        case GET_MESSAGE_FROM_WEBSOCKET:
          return {...state,chatroomMessages:[...state.chatroomMessages,action.message.message]}
        case GET_ONLINE_USER:
          return {...state,onlineUsers:[...state.onlineUsers,action.data]};
        case REMOVE_ONLINE_USER:
          return {...state,onlineUsers:state.onlineUsers.filter((user)=>user.username!= action.data)};
          case GET_ONLINE_USERS:
            return {...state,onlineUsers:[...action.data]}
        default: 
            return state;
    }
}

const getMessagesMiddleware = (store) => (next) => (action) => {
    if (action.type === GET_MESSAGES_FROM_API) {
      // Make an API call to fetch Book from the server
        axios.get(`v1/messages`).then((response) => {
          if(response.data.valid){
          
          store.dispatch({ type: REQUEST_MESSAGES, data: response.data.messages });
          }
        
        })
    }else if (action.type === DELETE_MESSAGE){
        axios.delete(`/v1/messages/${action.id}`);
      }else if(action.type === REQUEST_LOGOUT_USER){
          axios.delete(`/v1/logout/${action.id}`).then((response)=>{          
              if(response.data.valid){
                store.dispatch({type:LOGOUT_USER});
              }
          });
      }else if (action.type === SEND_MESSAGE_TO_BACK_END){
        
        fetch('/v1/messages',{
          method:"POST",
          body:JSON.stringify({
              body:action.body,
              user_id: action.user_id,
          }),
          headers:{
              'Content-Type': 'application/json'
          }
      })
      }
  
    return next(action);
  };
const store = configureStore({
    reducer: rootReducer,
    middleware:
       (getDefaultMiddleware) => getDefaultMiddleware().concat(
         logger,
         thunk,
         getMessagesMiddleware
       ),
  })
export default store;