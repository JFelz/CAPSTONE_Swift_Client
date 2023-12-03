import React, { useEffect, useState } from 'react';
import { getProductsFromOrder, getSingleActiveOrder, updateOrder } from '../../../api/orderData';
import { useAuth } from '../../../utils/context/authContext';
import ClientProdListCard from '../../../components/client/ClientProdListCard';

export default function OrderConfirmationPage() {
  const [activeOrder, setActiveOrder] = useState();
  const [fullProd, setFullProd] = useState();
  const { user } = useAuth();

  const getOrderData = () => {
  //   Get newly created Order to tag products to
    getSingleActiveOrder(user.uid).then(setActiveOrder);
  };

  console.log('activeOrder:', activeOrder);
  console.log('activeOrderID:', activeOrder?.id);

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    if (activeOrder) {
      getProductsFromOrder(activeOrder?.id).then(setFullProd);
    }
  }, [activeOrder]);

  const handleUpdate = () => {
    const payload = {
      ...activeOrder,
      status: false,
    };
    updateOrder(activeOrder?.id, payload);
  };

  handleUpdate();

  return (
    <>
      <div>
        <h1> Purchase Confirmed! </h1>
      </div>
      <h6>Created On:</h6>
      <p>{activeOrder?.dateTime}</p>
      <div>
        <h6>Full Name:</h6>
        <p>{activeOrder?.customerName}</p>
        <h6>Email:</h6>
        <p>{activeOrder?.customerEmail}</p>
        <h6>Street Address:</h6>
        <p>{activeOrder?.streetAddress}</p>
        <h6>Town/City:</h6>
        <p>{activeOrder?.townCity}</p>
        <h6>Zipcode:</h6>
        <p>{activeOrder?.zipcode}</p>
        <h6>State:</h6>
        <p>{activeOrder?.state}</p>
        <h6>Country</h6>
        <p>{activeOrder?.country}</p>
        <h6>Phone Number:</h6>
        <p>{activeOrder?.customerPhoneNumber}</p>
        <h6>Payment Type:</h6>
        <p>{activeOrder?.paymentType}</p>
        <h6>Shipping Method: {activeOrder?.shippingMethod}</h6>
        <li>Standard: Free (3-5 Business Days)</li>
        <li>Express +$35 (1-2 Business Days)</li>
        <li>Overnight +$65 (Overnight Shipping)</li>
        <br />
        <h5>Total: {activeOrder?.revenue}</h5>
      </div>
      <div>
        <h4> Purchased Products </h4>
        {fullProd?.map((orderObj) => <ClientProdListCard key={orderObj?.id} orderObj={orderObj} />)}
      </div>
    </>
  );
}
