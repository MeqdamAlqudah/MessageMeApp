import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import thunk from "redux-thunk";
const initialState = {
    things: [
        {
            name:"test",
            guid: "123"
        }
    ]
};

const rootReducer = (state = initialState,action)=>{
    switch(action.type){
        case "GET_THINGS_SUCCESS":
            return {things: action.json.things};
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