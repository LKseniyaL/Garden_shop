import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, showMoreProducts } from '../../../store/slice/allProductsSlice';
import ProductItem from '../ProductItem';
import { showDiscount, sortProducts, filterItems } from '../../../store/slice/allProductsSlice';
import Spinner from '../../../components/ProcessingRequest/Spinner';
import Error from '../../../components/ProcessingRequest/Error';
import s from './style.module.scss';

export default function ProductsContainer() {
    const visibleProducts = useSelector(state => state.allProductsSlice.visibleProducts);
    const products = useSelector(state => state.allProductsSlice.list);
    const status = useSelector(state => state.allProductsSlice.status);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct())
    },[dispatch]);

    const [ checked, setChecked ] = useState(false);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

  

    const handleChange = () => setChecked(!checked);
    const sort = (e) => dispatch(sortProducts(e.target.value));
    const handleClick = (e) => dispatch(showDiscount(e.target.checked));

    const handleShowMore = () => {
        dispatch(showMoreProducts(products.length));
    };

    useEffect(() => {
        dispatch(filterItems({ minValue: +minValue || 0,
                               maxValue: +maxValue || Infinity
                              }))
      }, [minValue, maxValue, dispatch]);

    if(status === 'loading'){
        return <Spinner/>
    }
    if(status === 'rejected'){
        return <Error/>
    }

  return (
    <section className={s.container}>
        <div className={s.container_title}>All products</div>
        <div className={s.container_form}>
            <div className={s.container_form_price}>
                <div className={s.container_form_price_subheader}>Price</div>
                <form>
                    <input 
                      type="number" 
                      placeholder='from' 
                      name="min" 
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}/>
                    <input 
                      type="number" 
                      placeholder='to' 
                      name="max" 
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
    <div className={s.container_block}>
        <div className={s.container_block_products}>
        {
           products.slice(0, visibleProducts).filter(item => item.show_item)
           .map(item => <ProductItem key={item.id} {...item}/>)
        }
        </div>
        <div>
        {
            visibleProducts < products.length && (
                <button onClick={handleShowMore} className={s.container_block_btn}>More</button>
            )
        }
        </div>
    </div>
    </section>
  )
}
