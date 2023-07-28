import React from 'react';
import Banner from '../Banner';
import DiscountRequest from '../DiscountRequest';
import SaleMain from "../SaleMain";
import CategoryMainBlock from "../CategoryMainBlock";

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
