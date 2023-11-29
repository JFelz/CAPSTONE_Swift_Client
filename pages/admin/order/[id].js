import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../api/orderData';

export default function OrderViewPage() {
  const [order, setOrder] = useState();
  const router = useRouter();
  const { id } = router.query;

  const currentOrder = () => {
    getSingleOrder(id).then(setOrder);
  };

  useEffect(() => {
    currentOrder();
  }, []);

  return (
    <>
      <h3> Order Details </h3>
      <div>
        <p>{order?.customerName}</p>
        <p>{order?.customerEmail}</p>
        <p>Created on: {order?.dateTime}</p>
      </div>
    </>
  );
}
