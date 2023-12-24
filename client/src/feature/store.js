import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from './themeslice';


export const store = configureStore({
    reducer:{
        themekey:themeSliceReducer,
    },
});