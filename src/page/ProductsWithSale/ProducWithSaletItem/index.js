import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/slice/basketSlice";
import s from "./style.module.scss";

export default function ProductWithSaleItem({title, price, discont_price, image, id}) {
  const imageUrl = `http://localhost:3333${image}`;
  const newPrice = discont_price
    ? (price - (price * discont_price) / 100).toFixed(2)
    : price;
  const newTitle = title.length > 25 ? title.slice(0, 25) + "..." : title;

  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <Link to={`/allproducts/${id}`}>
        <img src={imageUrl} alt="image" />
      </Link>
      <button
        className={s.container_btn}
        onClick={() => dispatch(addItem(+id))}>Add to cart</button>
      <div className={s.container_price_block}>
        <div className={s.container_price_block_new}>{newPrice}$</div>
        <div className={s.container_price_block_old}>{price}$</div>
        <div className={s.container_price_block_discount}>-{discont_price}%</div>
      </div>
      <div className={s.container_subheader}>{newTitle}</div>
    </div>
  );
}
