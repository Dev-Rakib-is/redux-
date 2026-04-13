import { configureStore } from "@reduxjs/toolkit";
import todoreducer from "../features/todo/todoSlice";



export const store = configureStore({
    reducer: {
        todo: todoreducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch