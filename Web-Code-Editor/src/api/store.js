import { configureStore } from "@reduxjs/toolkit";
import { compilerApi } from "./compilerApi";
export const store=configureStore({
    reducer:{
        [compilerApi.reducerPath]:compilerApi.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(compilerApi.middleware),
    devTools: true
})