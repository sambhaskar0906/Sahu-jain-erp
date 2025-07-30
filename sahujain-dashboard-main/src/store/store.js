import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/user/userSlice";
import personalInfoReducer from "../features/personalInfo/personalInfoSlice";
export const store= configureStore({
    reducer:{
        user:userReducer,
        personalInfo:personalInfoReducer,
    }
})