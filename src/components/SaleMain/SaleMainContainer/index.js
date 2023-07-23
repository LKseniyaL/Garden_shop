import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSaleMainItemSlice } from '../../../store/slice/saleMainItemSlice';
import SaleMainItem from '../SaleMainItem/index';
import Spinner from '../../ProcessingRequest/Spinner';
import Error from '../../ProcessingRequest/Error';
import s from './style.module.scss';

export default function SaleMainContainer() {
  const sale = useSelector(state => state.saleMain.list);
  const status = useSelector(state => state.saleMain.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSaleMainItemSlice())
  }, [dispatch]);

  if(status === 'loading'){
    return <div><Spinner/></div>
  }
  if(status === 'rejected'){
    return <div><Error/></div>
  }

  return (
    <section id='saleMainContainer'>
      <div className={s.sale_section}>
        <div className={s.sale_section_header}>Sale</div>
        <div className={s.sale_section_block}>
          {
            sale.map(item => <SaleMainItem key={item.id} {...item}/>)
          }
        </div>
      </div>
    </section>
  )
}
