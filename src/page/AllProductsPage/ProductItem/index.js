import React from "react";
import { Link } from "react-router-dom";
import { addItem } from "../../../store/slice/basketSlice";
import { useDispatch } from "react-redux";
import s from "./style.module.scss";

export default function ProductItem({
  title,
  discont_price,
  price,
  image,
  id,
}) {
  const imageUrl = `http://localhost:3333${image}`;
  const newTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

  const newPrice = discont_price
    ? (price - (price * discont_price) / 100).toFixed(2)
    : price;

  const dispatch = useDispatch();

  return (
    <div className={s.products}>
      <Link to={`/allproducts/${id}`}>
        <img src={imageUrl} alt="ProductItem" />
      </Link>
      <button className={s.products_btn} onClick={() => dispatch(addItem(+id))}>
        Add to cart
      </button>
      <div className={s.products_block}>
        {discont_price ? (
          <div className={s.products_block_price}>
            <div className={s.products_block_price_new}>{newPrice}$</div>
            <div className={s.products_block_price_old}>{price}$</div>
            <div className={s.products_block_price_discont}>
              -{discont_price}%
            </div>
          </div>
        ) : (
          <div className={s.products_block_price_old_alone}>{price}$</div>
        )}
        <div className={s.products_block_price_title}>{newTitle}</div>
      </div>
    </div>
  );
}
