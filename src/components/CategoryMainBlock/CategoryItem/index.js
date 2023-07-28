import React from "react";
import { Link } from "react-router-dom";
import s from "./style.module.scss";

export default function CategoryItem({ title, image, id }) {
  const imageUrl = `http://localhost:3333${image}`;
  return (
    <div className={s.category}>
      <div className={s.category_allCategory_block}>
        <Link to={`/categories/${id}`}>
          <img src={imageUrl} alt="category" className={s.category_image} />
        </Link>
        <div className={s.category_title}>{title}</div>
      </div>
    </div>
  );
}
