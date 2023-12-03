import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductsFromOrder, getSingleOrder } from '../../../api/orderData';
import ClientProdListCard from '../../../components/client/ClientProdListCard';

export default function ClientOrderViewPage() {
  const [order, setOrder] = useState();
  const [productList, setProductList] = useState();
  const router = useRouter();
  const { id } = router.query;

  const currentOrder = async () => {
    getSingleOrder(id).then(setOrder);
    await getProductsFromOrder(order?.id).then(setProductList);
  };
  useEffect(() => {
    currentOrder();
  }, [order]);

  return (
    <>
      <h3> Order Details #{order?.id}</h3>
      <h6>Created On:</h6>
      <p>{order?.dateTime}</p>
      <div>
        <h6>Full Name:</h6>
        <p>{order?.customerName}</p>
        <h6>Email:</h6>
        <p>{order?.customerEmail}</p>
        <h6>Street Address:</h6>
        <p>{order?.streetAddress}</p>
        <h6>Town/City:</h6>
        <p>{order?.townCity}</p>
        <h6>Zipcode:</h6>
        <p>{order?.zipcode}</p>
        <h6>State:</h6>
        <p>{order?.state}</p>
        <h6>Country</h6>
        <p>{order?.country}</p>
        <h6>Phone Number:</h6>
        <p>{order?.customerPhoneNumber}</p>
        <h6>Payment Type:</h6>
        <p>{order?.paymentType}</p>
        <h6>Shipping Method: {order?.shippingMethod}</h6>
        <li>Standard: Free (3-5 Business Days)</li>
        <li>Express +$35 (1-2 Business Days)</li>
        <li>Overnight +$65 (Overnight Shipping)</li>
        <br />
        <h5>Total: {order?.revenue}</h5>
      </div>
      <br />
      <h3>Purchase History</h3>
      <br />
      <div>
        {productList?.map((obj) => <ClientProdListCard key={obj.id} orderObj={obj} />)}
      </div>
    </>
  );
}
