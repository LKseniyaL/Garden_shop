import React from 'react';
import Banner from '../../components/Banner';
import DiscountRequest from '../../components/DiscountRequest';
import SaleMain from "../../components/SaleMain";
import Footer from "../../components/Footer";
import CategoryMainBlock from "../../components/CategoryMainBlock";

export default function MainPage() {
  return (
    <div>
          <Banner />
          <CategoryMainBlock />
          <DiscountRequest />
          <SaleMain />
    </div>
  )
}
