import React, { useState } from "react";
import { showDiscount, sortProducts } from "../../store/slice/allProductsSlice";
import { useDispatch } from "react-redux";
import s from "./style.module.scss";

export default function SortingPanel() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  const dispatch = useDispatch();
  const sort = (e) => dispatch(sortProducts(e.target.value));

  const handleClick = (e) => dispatch(showDiscount(e.target.checked));

  return (
    <div className={s.container}>
      <form>
        <div className={s.container_price}>
          <div className={s.container_price_subheader}>Price</div>
          <input type="number" placeholder="from" name="priceFrom" />
          <input type="number" placeholder="to" name="priceTo" />
        </div>
        <div className={s.container_item}>
          <div className={s.container_item_subheader}>Discounted items</div>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            onClick={handleClick}
          />
        </div>
        <div className={s.container_sorted}>
          <div className={s.container_sorted_subheader}>Sorted</div>
          <select
            onInput={sort}
            defaultValue={{ value: "default" }}
            className={s.container_sorted_input}>
            <option value="default" hidden>
              by default
            </option>
            <option value="title">by title</option>
            <option value="price">by price</option>
          </select>
        </div>
      </form>
    </div>
  );
}
