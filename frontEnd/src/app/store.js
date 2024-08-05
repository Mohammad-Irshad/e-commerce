import {configureStore} from '@reduxjs/toolkit'
import  productsSlice  from '../pages/features/productsSlice'


export default configureStore({
    reducer : {
        products : productsSlice
    }
})

// export default store



// store.js
// import { configureStore } from "@reduxjs/toolkit";
// import 

// const store = configureStore({
//   reducer: {
//     products: productsReducer,
//   },
// });

// export default store;
