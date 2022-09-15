import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import thunk from "redux-thunk";
const initialState = {
    userInfo: [],
};
const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
const LOGOUT_USER ="LOGOUT_USER";
const rootReducer = (state = initialState,action)=>{
    switch(action.type){
        case GET_USER_INFO_REQUEST:
            return {userInfo: action.json.userInfo};
        case LOGOUT_USER:
            return {userInfo:[]}
        default: 
            return state;
    }
}

const store = configureStore({
    reducer: rootReducer,
    middleware:
       (getDefaultMiddleware) => getDefaultMiddleware().concat(
         logger,
         thunk
       ),
  })
export default store;