import React from 'react';
import error_img from './media/error.png';
import s from './style.module.scss';

export default function Error() {
  return (
    <div className={s.error}>
      <img src={error_img} alt="error" />
    </div>
  )
}
