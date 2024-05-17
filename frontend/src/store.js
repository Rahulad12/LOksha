import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlices.js";
import cartSlicereducer from "./slices/cartSlice.js"
import authSlicereducer from "./slices/authSlices.js";


const Store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart:cartSlicereducer,
        auth:authSlicereducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true,
});

export default Store;