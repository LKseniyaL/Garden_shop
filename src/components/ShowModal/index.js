import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../store/slice/showModalSlice';
import s from './style.module.scss';

export default function ShowModal() {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(setShowModal(false));

  return (
    <section className={s.section}>
        <div className={s.modal}>
            <div className={s.modal_title}>Thanks for your <br/>inquiry</div>
            <div className={s.modal_discount}>Your discount is <br/> 5 %</div>
            <div className={s.modal_btn} onClick={closeModal}>X</div>
        </div>
    </section>
  )
}
