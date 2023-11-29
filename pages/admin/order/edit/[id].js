import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../../api/orderData';
import OrdersPage from '../main';

export default function EditOrderPage() {
  const [editOrder, setEditOrder] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditOrder);
  }, [id]);

  return (
    <>
      <h1> {editOrder?.customerName} </h1>
      <div>
        <OrdersPage editOrder={editOrder} />
      </div>
    </>
  );
}
