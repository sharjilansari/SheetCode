import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "../features/counter/counterSlice";


export const store = configureStore({
    reducer: {
        counter: codeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
