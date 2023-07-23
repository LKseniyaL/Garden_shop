import React from "react";
import s from "./style.module.scss";
import instagram from "./media/instagram.png";
import whatsapp from "./media/whatsapp.png";

export default function Adress() {
  return (
    <section className={s.footer}>
      <div>
        <div className={s.footer_contact}>Contact</div>
        <a href="tel:+49 999 999 99 99" className={s.footer_tel}> +49 999 999 99 99 </a>
        <div className={s.footer_social_block}>
          <a href="https://www.instagram.com/" className={s.footer_instagram}>
            <img src={instagram} alt="instagram" />
            <div className={s.footer_instagram_title}>instagram</div>
          </a>
          <a href="https://www.whatsapp.com/?lang=ru" className={s.footer_whatsapp}>
            <img src={whatsapp} alt="whatsapp" />
            <div className={s.footer_whatsapp_title}>WhatsApp</div>
          </a>
        </div>
      </div>
      <div className={s.footer_address_block}>
        <div className={s.footer_address}>Address</div>
        <a href="https://www.google.com/search?q=telranDE">
          Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
        </a>
        <div className={s.footer_address_title}>Working Hours:</div>
        <div className={s.footer_address_hour}>24 hours a day</div>
      </div>
    </section>
  );
}
