  import React, { useEffect, useState }from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import ProductWithSaleItem from '../ProducWithSaletItem';
  import { fetchSaleProducts, filterItems } from '../../../store/slice/productsWithSale';
  import { sortProducts } from '../../../store/slice/productsWithSale';
  import s from './style.module.scss';
  import Spinner from '../../../components/ProcessingRequest/Spinner';
  import Error from '../../../components/ProcessingRequest/Error';

  export default function ProductsWithSaleContainer() {
    const productsSale = useSelector(state => state.productsWithReducer.list);
    const status = useSelector(state => state.productsWithReducer.status);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchSaleProducts())
    }, [dispatch]);


    useEffect(() => {
      // Фильтрует автоматически после каждого изменения значений
      dispatch(filterItems({ minValue: +minValue || 0, 
                             maxValue: +maxValue || Infinity }));
    }, [minValue, maxValue, dispatch]);

    const sort = (e) => dispatch(sortProducts(e.target.value));
    


    if(status === 'loading'){
      return <Spinner/>
    }
    if(status === 'rejected'){
      return <Error/>
    }

    return (
      <div className={s.container}>
        <div className={s.container_subheader}>Products with sale</div>

        <div className={s.container_sort}>
          <div className={s.container_sort_price}>
            <div className={s.container_sort_price_subheader}>Price</div>
            <form>
              <input
                type="number"
                name='min'
                placeholder='from'
                min='0'
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                className={s.container_sort_price_input} />
              <input
                type="number"
                name='max'
                placeholder='to'
                min='0'
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                className={s.container_sort_price_input} />
          </form>
          </div>

          <div className={s.container_sort_sorted}>
            <div className={s.container_sort_sorted_subheader}>Sorted</div>
            <select className={s.container_sort_sorted_input} onInput={sort} defaultValue={{value: 'default'}}>
              <option value="default" hidden>by default</option>
              <option value="title">by title</option>
              <option value="price">by price</option>
            </select>
          </div>
        </div>

        <div className={s.container_image}>
          {
             productsSale.filter(item => item.show_item)
            .map(item => <ProductWithSaleItem key={item.id} {...item}/>)
          }
        </div>
      </div>
    )
  }
