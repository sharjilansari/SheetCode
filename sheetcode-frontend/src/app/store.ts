import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "../features/counter/counterSlice";
import authReducer from "../features/counter/authSlice";


export const store = configureStore({
    reducer: {
        counter: codeReducer,
        auth: authReducer, 
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
