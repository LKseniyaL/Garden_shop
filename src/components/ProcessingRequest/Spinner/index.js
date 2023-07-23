import React from 'react';
import loading_img from './media/loading.png';
import s from './style.module.scss';

export default function Spinner() {
  return (
    <div className={s.loading}>
      <img src={loading_img} alt="loading" />
    </div>
  )
}
