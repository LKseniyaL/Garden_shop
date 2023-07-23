import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from '../../page/MainPage';
import ProductsContainer from '../../page/AllProductsPage/ProductsContainer';
import BasketPage from '../../page/BasketPage/Basket';
import CategoryPageContainer from '../../page/CategoriesPage/CategoryPageContainer';
import NotFound from '../../page/NotFound';
import ProductsWithSaleContainer from '../../page/ProductsWithSale/ProductsWithSaleContainer';
import ProductsItemContainerPage from "../../page/ProductsItemContainer/ProductsItemContainerPage";
import Layout from '../Layout';
import Footer from "../Footer";
import ProductDescription from "../../page/ProductDescription";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="/categories" element={<CategoryPageContainer/>}/>
        <Route path="/allproducts/:id" element={<ProductDescription/>}/>
        <Route path="/categories/:category" element={<ProductsItemContainerPage/>}/>
        <Route path="/allproducts" element={<ProductsContainer/>}/>
        <Route path="/allsale" element={<ProductsWithSaleContainer/>}/>
        <Route path="/basket" element={<BasketPage/>}/>
        <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
