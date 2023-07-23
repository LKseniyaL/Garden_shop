import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from "../../store/slice/showModalSlice";
import ShowModal from "../ShowModal";
import discountImg from "./media/discountImg.png";
import { discountSale } from '../../post';
import s from "./style.module.scss";

export default function DiscountRequest() {
  const showModal = useSelector(state => state.showModalReducer.list[0].showModal);
  const dispatch = useDispatch();

  const [telValue, setTelValue] = useState(''),
        [buttonStyle, setButtonStyle] = useState({}),
        [showWarning, setShowWarning] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    if(telValue.trim() === '' || telValue.length < 7) {
      setButtonStyle({backgroundColor: 'red'});
      setShowWarning(true);
      return; 
    }else{
      dispatch(setShowModal(true));
      setTelValue(' ');
      setShowWarning(false);
      setButtonStyle({ backgroundColor: 'green' });

      const sale = {
        id: Date.now(),
        tel: e.target.tel.value
      }
      dispatch(discountSale(sale));
    }
  };

  const handleTelChange = (e) => {
    setTelValue(e.target.value);
    setShowWarning(false);
  };


  return (
    <div className={s.discount}>
      <div className={s.discount_block}>
        <div className={s.discount_img}>
          <img src={discountImg} alt="discountImg" />
        </div>
        <div className={s.discount_form}>
          <div className={s.discount_form_sale}>5% off <br/><span>on the first order</span></div>
          {showWarning && <span style={{color: 'red', fontSize: '24px'}}>Enter phone number (min. 7 characters)</span>}
          <form onSubmit={handleSubmit}>
            <input 
              type="number" 
              name="tel" 
              placeholder="+49" 
              onChange={handleTelChange}/>
            <button style={buttonStyle}>Get a discount</button>
          </form>
        </div>
      </div>
      {
      showModal && <ShowModal/>
      }
    </div>
  );
}
