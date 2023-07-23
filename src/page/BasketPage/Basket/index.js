  import React from 'react';
  import BasketList from '../BasketList';
  import BasketCalculation from '../BasketCalculation';
  import { useSelector } from 'react-redux';
  import { Link } from 'react-router-dom';
  import s from './style.module.scss';

  export default function BasketPage() {
    const basket = useSelector(state => state.basketReducer.list);
    const products = useSelector(state => state.allProductsSlice.list);

    const list = basket.map(el => {
      const product = products.find(({id}) => id === el.id);
      return {...product, ...el};
    })
    
    return (
      <div className={s.container}>
          <div className={s.container_header}>Shopping cart</div>
          {
            basket.length > 0 ? 
            <>
              <div className={s.container_subheader}><Link to={'/'}>Back to the store {'>'}</Link></div>
              <div className={s.container_order}>
                <BasketList list={list}/>
                <BasketCalculation list={list}/>
              </div>
            </>
          : <div className={s.container_cart}>Cart is empty</div>
          }
      </div>
    )
  }
