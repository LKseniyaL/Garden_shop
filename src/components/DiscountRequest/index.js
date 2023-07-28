import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../../store/slice/showModalSlice";
import ShowModal from "../ShowModal";
import discountImg from "./media/discountImg.png";
import { discountSale } from "../../post";
import s from "./style.module.scss";

export default function DiscountRequest() {
  const showModal = useSelector((state) => state.showModalReducer.list[0].showModal);
  const dispatch = useDispatch();

  const [telValue, setTelValue] = useState("+49 "),
        [buttonStyle, setButtonStyle] = useState({}),
        [showWarning, setShowWarning] = useState(false);

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

      const sale = {
        id: Date.now(),
        tel: telValue,
      };
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
          <div className={s.discount_form_sale}>
            5% off <br />
            <span>on the first order</span>
          </div>
          {showWarning && (
            <span
              style={{ color: "red", fontSize: "24px", marginLeft: "100px" }}>
              number must be 11 digits
            </span>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              name="tel"
              value={telValue}
              onChange={handleTelChange}
            />
            <button style={buttonStyle}>Get a discount</button>
          </form>
        </div>
      </div>
      {showModal && (
        <ShowModal
          title={"Thanks for your inquiry"}
          subtitle={"Your discount is 5 %"}
        />
      )}
    </div>
  );
}
