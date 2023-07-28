import { configureStore } from '@reduxjs/toolkit';
import showModalSlice from './slice/showModalSlice';
import allCategoriesReducer from './slice/allCategoriesSlice';
import allProductsSlice from './slice/allProductsSlice';
import categoriesItemReduser from './slice/categoriesItemSlice';
import productDescriptionReducer from './slice/productDescriptionSlice';
import basketReduser from './slice/basketSlice';


export const store = configureStore({
  reducer: {
    showModalReducer: showModalSlice,
    allCategoriesReducer: allCategoriesReducer,
    allProductsSlice: allProductsSlice,
    categoriesItemReduser: categoriesItemReduser,
    productDescriptionReducer: productDescriptionReducer,
    basketReducer: basketReduser
  },
});







