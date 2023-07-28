import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/slice/basketSlice";
import s from "./style.module.scss";

export default function SaleMainItem({image, price, title, discont_price, id}) {
  const imageUrl = `http://localhost:3333${image}`;
  const newTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;
  const newPrice = discont_price
    ? (price - (price * discont_price) / 100).toFixed(2)
    : price;

  const dispatch = useDispatch();

  return (
    <div className={s.sale_item}>
      <Link to={`/allproducts/${id}`}>
        <img src={imageUrl} alt="sale" className={s.sale_item_img} />
      </Link>
      <button
        className={s.sale_item_btn}
        onClick={() => dispatch(addItem(+id))}>
        Add to cart
      </button>
      <div className={s.sale_item_block}>
        <div className={s.sale_item_price}>{newPrice}$</div>
        <div className={s.sale_item_old_price}>{price}$</div>
        <div className={s.sale_item_discont}>-{discont_price}%</div>
      </div>
      <div className={s.sale_item_title}>{newTitle}</div>
    </div>
  );
}
