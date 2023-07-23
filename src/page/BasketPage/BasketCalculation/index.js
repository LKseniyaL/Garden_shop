import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { discountOrder } from '../../../post';
import s from './style.module.scss';

export default function BasketCalculation({list}) {
  
  const totalSum = list.reduce((acc, item) =>{
    const { discont_price, price, basketCount } = item;
    const newPrice = discont_price ? (price - (price * discont_price / 100)).toFixed(2) : price;
    return  acc + basketCount * newPrice;
  }, 0);

  const dispatch = useDispatch();


  const [telValue, setTelValue] = useState(''),
        [buttonStyle, setButtonStyle] = useState({}),
        [showWarning, setShowWarning] = useState(false);

  const handleTelInputChange = (e) => {
    setTelValue(e.target.value);
    setShowWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (telValue.trim() === '' || telValue.length < 7) {
      setButtonStyle({ backgroundColor: 'red' });
      setShowWarning(true);
      return;
    } else {
      setTelValue(' ');
      setShowWarning(false);
      setButtonStyle({ backgroundColor: 'green' });

      const order = {
        id: Date.now(),
        tel: e.target.number.value
      };
      dispatch(discountOrder(order));
    }
  };

  return (
  <div>
   <div className={s.order}>
      <div className={s.order_title}>Order details</div>
      <div className={s.order_block}>
         <div className={s.order_block_subheader}>Total</div>
         <div className={s.order_block_price}>{totalSum}$</div>
      </div>
      <form onSubmit={handleSubmit} className={s.order_form}>
        <input 
          className={s.order_form_input} 
          placeholder='Phone number' 
          name='number' 
          type='number'
          value={telValue}
          onChange={handleTelInputChange}/>
        <button className={s.order_form_btn} style={buttonStyle}>Order</button>
      </form>
   </div>
      {showWarning && <span style={{color: 'red', fontSize: '24px'}}>Enter phone number (min. 7 characters)</span>}
  </div>
  )
}
