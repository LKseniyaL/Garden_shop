import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDescription } from "../../store/slice/productDescriptionSlice";
import { addItem } from "../../store/slice/basketSlice";
import Spinner from "../../components/ProcessingRequest/Spinner";
import Error from "../../components/ProcessingRequest/Error";
import s from "./style.module.scss";

export default function ProductDescription() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDescription(id));
  }, [id]);

  const products = useSelector((state) => state.productDescriptionReducer.list);
  const status = useSelector((state) => state.productDescriptionReducer.status);

  const product = products.find((product) => product.id === +id);

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "rejected") {
    return <Error />;
  }

  return (
    <div>
      {product && product.length !== 0 && (
        <div className={s.container}>
          <div className={s.container_firstBlock}>
            <div className={s.container_firstBlock_subheader}>
              {product.title}
            </div>
            <img src={"http://localhost:3333" + product.image} alt="product" />
          </div>
          <div className={s.container_secondBlock}>
            <div className={s.container_secondBlock_header}>
              {
              product.discont_price ? (
                <div className={s.container_secondBlock_header_price}>
                  <div className={s.container_secondBlock_header_price_newPrice}>
                    {
                    product.discont_price ? (product.price - (product.price * product.discont_price / 100)).toFixed(2) : product.price +'$'
                    }
                  </div>
                  <div className={s.container_secondBlock_header_price_oldPrice}>{product.price}$</div>
                  <div className={s.container_secondBlock_header_price_disc}>-{product.discont_price}%</div>
                </div>) 
                : (
                <div className={s.container_secondBlock_header_price}>
                  <div className={s.container_secondBlock_header_price_onePrice}>{product.price}$</div>
                </div>
              )}
            </div>
            <button className={s.container_secondBlock_btn} onClick={() => dispatch(addItem(+id))}>
              To cart
            </button>
            <div className={s.container_secondBlock_line}>
            </div>
            <div className={s.container_secondBlock_subheader}>Description</div>
            <div className={s.container_secondBlock_desc}>
              {product.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
