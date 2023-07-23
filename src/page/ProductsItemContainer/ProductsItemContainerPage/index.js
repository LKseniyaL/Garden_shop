import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductItemPage from '../ProductItemPage/index';
import { fetchInCategoriesSlice } from '../../../store/slice/categoriesItemSlice';
import { sortProducts, showDiscount, filterItems } from '../../../store/slice/categoriesItemSlice';
import s from './style.module.scss';

export default function ProductsItemContainerPage() {
  const { category } = useParams();
    const categoryItem = useSelector(state => state.categoriesItemReduser.list);
    const status = useSelector(state => state.categoriesItemReduser.status);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchInCategoriesSlice(category))
    }, [dispatch]);

    const [ checked, setChecked ] = useState(false);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    const handleChange = () => setChecked(!checked);
    const sort = (e) => dispatch(sortProducts(e.target.value));
    const handleClick = (e) => dispatch(showDiscount(e.target.checked));

    useEffect(() => {
      dispatch(filterItems({ minValue: +minValue || 0,
                             maxValue: +maxValue || Infinity
                            }))
    }, [minValue, maxValue, dispatch]);

  return (
    <div className={s.container}>
      <div className={s.container_subheader}>Tools and equipment</div>
      {/* sorting panel */}
      <div className={s.container_form}>
          <div className={s.container_form_price}>
              <div className={s.container_form_price_subheader}>Price</div>
                <form>
                  <input 
                    type="number" 
                    placeholder='from' 
                    name='min'
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}/>
                  <input 
                    type="number" 
                    placeholder='to' 
                    name='max'
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}/>
                  </form>
            </div>
            <div className={s.container_form_item}>
                <div className={s.container_form_item_subheader}>Discounted items</div>
                <input type='checkbox' checked={checked} onChange={handleChange} onClick={handleClick}/>
            </div>
            <div className={s.container_form_sorted}>
                <div className={s.container_form_sorted_subheader}>Sorted</div>
                <select onInput={sort} defaultValue={{value: 'default'}} className={s.container_form_sorted_input}>
                    <option value="default" hidden>by default</option>
                    <option value="title">by title</option>
                    <option value="price">by price</option>
                </select>
            </div>
        </div>
      <div className={s.container_category}>
      {
        categoryItem.filter(item => item.show_item)
        .map(item => <ProductItemPage key={item.id} {...item}/>)
      }
      </div>
    </div>
  )
}
