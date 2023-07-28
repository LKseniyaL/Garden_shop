import React from "react";
import s from "./style.module.scss";
import img from "./media/icon_header.png";
import img_basket from "./media/Vector.png";
import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <header className={s.header}>
      <nav className={s.header_nav}>
        <div className={s.header_nav_container}>
          <Link to="/" className={s.link}>
            <img
              src={img}
              alt="icon"
              className={s.header_nav_container_image}
            />
          </Link>
          <Link to="/categories" className={s.link}>
            <div className={s.header_nav_container_btn}>Catalog</div>
          </Link>
        </div>
        <div className={s.header_nav_ul}>
          <Link to="/" className={s.link}>
            <div>Main Page</div>
          </Link>
          <Link to="/allproducts" className={s.link}>
            <div>All products</div>
          </Link>
          <Link to="/allsale" className={s.link}>
            <div>All sales</div>
          </Link>
        </div>
        <div className={s.header_nav_basket}>
          <Link to="/basket" className={s.link}>
            <img src={img_basket} alt="basket" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
