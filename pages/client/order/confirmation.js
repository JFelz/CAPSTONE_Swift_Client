import React, { useEffect, useState } from 'react';
import { getProductsFromOrder, getSingleActiveOrder, updateOrder } from '../../../api/orderData';
import { useAuth } from '../../../utils/context/authContext';
import ConfirmProductCard from '../../../components/client/ConfirmProductCards';

export default function OrderConfirmationPage() {
  const [activeOrder, setActiveOrder] = useState();
  const [fullProd, setFullProd] = useState();
  const { user } = useAuth();

  const getOrderData = () => {
  //   Get newly created Order to tag products to
    getSingleActiveOrder(user.uid).then(setActiveOrder);

    getProductsFromOrder(activeOrder?.Id).then(setFullProd);
  };

  console.log(activeOrder);

  const handleUpdate = () => {
    const payload = {
      ...activeOrder,
      status: false,
    };
    updateOrder(activeOrder?.id, payload);
  };

  handleUpdate();

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <>
      <div>
        <h1> Purchase Confirmed! </h1>
      </div>
      <div>
        <h3> Order Details </h3>
        <p>{activeOrder?.customerName}</p>
        <p>{activeOrder?.customerEmail}</p>
        <p>{activeOrder?.customerPhoneNumber}</p>
        <p>Payment Type: {activeOrder?.paymentType}</p>
        <p>Order Created: {activeOrder?.dateTime}</p>
        <p>Shipping Method: {activeOrder?.shippingMethod}</p>
        <p>Total: {activeOrder?.revenue}</p>
      </div>
      <div>
        <h4> Purchased Products </h4>
        {fullProd?.map((orderObj) => <ConfirmProductCard key={orderObj.id} orderObj={orderObj} />)}
      </div>
    </>
  );
}
