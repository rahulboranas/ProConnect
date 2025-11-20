import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer"
import postReducer from "./reducer/postReducer"
//steps for state management
//1-submit action
//2-handle action in reducer 
//3-register here -> reducer
export const store = configureStore({
    reducer:{
        auth:authReducer,
        posts:postReducer
    }
})