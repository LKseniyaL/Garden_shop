import React from 'react';
import { useDispatch } from 'react-redux';
import s from './style.module.scss';
import { removeItem, productInc, product_dec } from '../../../store/slice/basketSlice';

export default function BasketItem({id, title, price, image, discont_price, basketCount}) {
  const imageUrl = 'http://localhost:3333' + image;
  const newPrice = discont_price ? (price - (price * discont_price / 100)).toFixed(2) : price;

  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <div className={s.container_firstBlock}>
        <img src={imageUrl} alt="basketImage"/>
        <div className={s.container_firstBlock_titleBtn}>
          <div className={s.container_firstBlock_titleBtn_title}>{title}</div>
          <div className={s.container_firstBlock_titleBtn_btn}>
            <div 
              className={s.container_firstBlock_titleBtn_btn_inc}
              onClick={() => dispatch(product_dec(id))} >-</div>
            <div className={s.container_firstBlock_titleBtn_btn_count}>{basketCount}</div>
            <div className={s.container_firstBlock_titleBtn_btn_dec} onClick={() => dispatch(productInc(id))}>+</div>
          </div>
        </div>
        <div className={s.container_firstBlock_blockPrice}>
          {
            discont_price ? 
            <>
              <div className={s.container_firstBlock_blockPrice_newPrice}>{newPrice}$</div>
              <div className={s.container_firstBlock_blockPrice_oldPrice}>{price}$</div>
            </>
            :
              <div className={s.container_firstBlock_blockPrice_newPrice}>{price}$</div>
          }
        </div>
        <div className={s.container_firstBlock_delete} onClick={() => dispatch(removeItem(id))}>x</div>
      </div>
    </div>
  )
}
