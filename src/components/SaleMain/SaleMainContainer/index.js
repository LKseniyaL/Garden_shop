import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from '../../../store/slice/allProductsSlice';
import SaleMainItem from "../SaleMainItem/index";
import Spinner from "../../ProcessingRequest/Spinner";
import Error from "../../ProcessingRequest/Error";
import s from "./style.module.scss";

export default function SaleMainContainer() {
  const newList = useSelector(state => state.allProductsSlice.list)
                  .filter(item => item.discont_price !== null)
                  .slice(0, 3);
  const status = useSelector(state => state.allProductsSlice.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <section id="saleMainContainer">
      <div className={s.sale_section}>
        <div className={s.sale_section_header}>Sale</div>
        <div className={s.sale_section_block}>
          {newList.map((item) => (<SaleMainItem key={item.id} {...item} />))}
        </div>
      </div>
    </section>
  );
}
