import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { discountOrder } from "../../../post";
import { setShowModal } from "../../../store/slice/showModalSlice";
import s from "./style.module.scss";
import ShowModal from "../../../components/ShowModal";

export default function BasketCalculation({ list }) {
  const showModal = useSelector((state) => state.showModalReducer.list[0].showModal);

  const totalSum = list.reduce((acc, item) => {
    const { discont_price, price, basketCount } = item;
    const newPrice = discont_price ? parseFloat((price - (price * discont_price / 100)).toFixed(2)) : price;
    return acc + basketCount * newPrice;
  }, 0).toFixed(2);

  const dispatch = useDispatch();

  const [telValue, setTelValue] = useState("+49 "),
        [buttonStyle, setButtonStyle] = useState({}),
        [showWarning, setShowWarning] = useState(false);

  const handleTelInputChange = (e) => {
    setTelValue(e.target.value);
    setShowWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (telValue.length < 15) {
      setButtonStyle({ backgroundColor: "red" });
      setShowWarning(true);
      return;
    } else {
      dispatch(setShowModal(true));
      setTelValue("+49 ");
      setShowWarning(false);
      setButtonStyle({ backgroundColor: "green" });

      const order = {
        id: Date.now(),
        tel: telValue,
      };
      dispatch(discountOrder(order));
    }
  };

  // function isValidGermanPhoneNumber(telValue) {
  //   const pattern = /^\+49\d{15}/;
  //   return pattern.test(telValue);
  // }

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
            name="number"
            type="tel"
            value={telValue}
            onChange={handleTelInputChange}
          />
          <button className={s.order_form_btn} style={buttonStyle}>
            Order
          </button>
        </form>
      </div>
      {showWarning && (
        <span style={{ color: "red", fontSize: "24px" }}>
          phone number must start with +49 and contain 11 digits
        </span>
      )}
      {showModal && (
        <ShowModal
          title={"Thank you for your order!"}
          subtitle={"your order is being processed"}
        />
      )}
    </div>
  );
}
