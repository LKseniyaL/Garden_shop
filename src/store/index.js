import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from './slice/productsSlice';
import showModalSlice from './slice/showModalSlice';
import categoriesSlice from './slice/categoriesSlice';
import saleMainItemSlice from './slice/saleMainItemSlice';
import categoriesPageSlice from './slice/categoriesPageSlice';
import allProductsSlice from './slice/allProductsSlice';
import productsWithReducer from './slice/productsWithSale';
import categoriesItemReduser from './slice/categoriesItemSlice';
import productDescriptionReducer from './slice/productDescriptionSlice';
import basketReduser from './slice/basketSlice';


export const store = configureStore({
  reducer: {
    showModalReducer: showModalSlice,
    categoriesReducer: categoriesSlice,
    saleMain: saleMainItemSlice,
    categoriesPage: categoriesPageSlice,
    allProductsSlice: allProductsSlice,
    productsWithReducer: productsWithReducer,
    categoriesItemReduser: categoriesItemReduser,
    productDescriptionReducer: productDescriptionReducer,
    basketReducer: basketReduser
  },
});







