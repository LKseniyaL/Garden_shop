import React from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../../store/slice/showModalSlice";
import s from "./style.module.scss";

export default function ShowModal({ title, subtitle }) {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(setShowModal(false));

  return (
    <section className={s.section}>
      <div className={s.modal}>
        <div className={s.modal_description}>
          <div className={s.modal_description_title}>{title}</div>
          <div className={s.modal_description_discount}>{subtitle}</div>
        </div>
        <div className={s.modal_btn} onClick={closeModal}>
          X
        </div>
      </div>
    </section>
  );
}
