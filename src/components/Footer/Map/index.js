import React from 'react';
import s from './style.module.scss';

export default function Map() {
  return (
    <div className={s.map}>
      <iframe className={s.map_iframe} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9713.636886541603!2d13.3750447!3d52.5079329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851d00f714303%3A0xb7b4fcea44396e2d!2sAIT%20TR%20GmbH!5e0!3m2!1sru!2sde!4v1689062032323!5m2!1sru!2sde" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}
