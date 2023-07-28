import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../../components/ProcessingRequest/Spinner';
import Error from '../../../components/ProcessingRequest/Error';
import { fetchCategories } from '../../../store/slice/allCategoriesSlice';
import CategoryPageItem from '../CategoryPageItem';
import s from './style.module.scss';

export default function CategoriesPage() {
  const categoryPage = useSelector(state => state.allCategoriesReducer.list);
  const status = useSelector(state => state.allCategoriesReducer.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  if(status === 'loading'){
    return <Spinner/>
  }
  if(status === 'rejected'){
    return <Error/>
  }

  return (
    <div className={s.container}>
      <div className={s.container_title}>Categories</div>
      <div className={s.container_categories}>
      {
        categoryPage.map(item => <CategoryPageItem key={item.id} {...item}/>)
      }
      </div>
    </div>
  )
}
