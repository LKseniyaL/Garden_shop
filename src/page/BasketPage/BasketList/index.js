import React from 'react';
import BasketItem from '../BasketItem';

export default function BasketList({list}) {
  return (
    <div>
      {
        list.map(item => <BasketItem key={item.id} {...item}/>)
      }
    </div>
  )
}
