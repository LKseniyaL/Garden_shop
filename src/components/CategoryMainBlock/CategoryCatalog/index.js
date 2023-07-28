import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/slice/allCategoriesSlice";
import { Link } from "react-router-dom";
import Spinner from "../../ProcessingRequest/Spinner";
import Error from "../../ProcessingRequest/Error";
import s from "./style.module.scss";
import CategoryItem from "../CategoryItem";

export default function CategoryCatalog() {
  const categories = useSelector((state) => state.allCategoriesReducer.list).slice(0, 4);
  const status = useSelector((state) => state.allCategoriesReducer.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
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
    <div className={s.category}>
      <div className={s.category_header}>
        <div className={s.category_header_catalog}>Catalog</div>
        <Link to="/categories" className={s.category_header_allCategory}>
          All categories
        </Link>
      </div>
      <div className={s.category_catalog}>
        {categories.map((item) => (<CategoryItem key={item.id} {...item} />))}
      </div>
    </div>
  );
}
