import React from 'react';
import s from './style.module.scss';
import banner_img from './media/banner.png';

export default function Banner() {
  return (
    <section className={s.banner}>
      <div className={s.banner_container}>
        <div className={s.banner_container_block}>
          <div className={s.banner_container_block_sale}>Sale</div>
          <h2 className={s.banner_container_block_h2}>New season</h2>
          <div className={s.banner_container_block_btn}><a href="#saleMainContainer">Sale</a></div>
        </div>
        <div className={s.banner_img}>
          <img src={banner_img} alt="" />
        </div>
        </div>
    </section>
  )
}
