import React from 'react';
import s from './style.module.scss';
import icon404 from './media/icon404.png';

export default function NotFound() {
  return (
    <section className={s.section}>
      <img src={icon404} alt="404" />
    </section>
  )
}
