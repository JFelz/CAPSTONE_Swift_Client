import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductsFromOrder, getSingleOrder } from '../../../api/orderData';
import ClientProdListCard from '../../../components/client/ClientProdListCard';

export default function OrderViewPage() {
  const [order, setOrder] = useState();
  const [productList, setProductList] = useState();
  const router = useRouter();
  const { id } = router.query;

  const currentOrder = async () => {
    getSingleOrder(id).then(setOrder);
    if (order?.id) {
      await getProductsFromOrder(order?.id).then(setProductList);
    }
  };
  useEffect(() => {
    currentOrder();
  }, [order?.id]);

  return (
    <>
      <h3> Order Details </h3>
      <div>
        <p>{order?.customerName}</p>
        <p>{order?.customerEmail}</p>
        <p>Created on: {order?.dateTime}</p>
      </div>
      <div>
        {productList?.map((obj) => <ClientProdListCard key={obj.id} orderObj={obj} />)}
      </div>
    </>
  );
}
