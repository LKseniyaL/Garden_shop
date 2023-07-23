import React from 'react';
import { Link, useParams } from 'react-router-dom';
import s from './style.module.scss';

export default function CategoryPageItem({title, image, id}) {
  const imageUrl = 'http://localhost:3333' + image;

  return (
      <div className={s.category_item}>
         <Link to={`/categories/${id}`}>
          <img src={imageUrl} alt="category"/>
        </Link>
        <div className={s.category_item_title}>{title}</div>
      </div>
  )
}
