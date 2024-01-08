import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, Button, Typography,
} from '@mui/material';
import { getProductsFromOrder, getSingleOrder } from '../../../api/orderData';
import ClientProdListCard from '../../../components/client/ClientProdListCard';

export default function ClientOrderViewPage() {
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
      <Card className="ConfirmationCard">
        <div className="ConfirmationHeader">
          <h2> Confirmation Order #{order?.id}</h2>
        </div>
        <CardContent>
          <div>
            <h4> Purchased Products </h4>
            {productList?.map((obj) => <ClientProdListCard key={obj.id} orderObj={obj} />)}
          </div>
        </CardContent>
        <CardContent className="ConfirmationSplit">
          <CardContent className="ConfirmationLeft">
            <h6> Shipped To: </h6>
            <p>{order?.customerName}</p>
            <p>{order?.streetAddress}</p>
            <p>{order?.townCity}</p>
            <p>{order?.zipcode}</p>
            <p>{order?.state}</p>
            <p>{order?.country}</p>
          </CardContent>
          <CardContent className="ConfirmationRight">
            <h6><b>Email:</b> {order?.customerEmail}</h6>
            <h6><b>Phone Number:</b> {order?.customerPhoneNumber}</h6>
            <h6><b>Payment Type:</b> {order?.paymentType}</h6>
            <h6><b>Shipping Method:</b> {order?.shippingMethod}</h6>
            <li>Standard: Free (3-5 Business Days)</li>
            <li>Express +$35 (1-2 Business Days)</li>
            <li>Overnight +$65 (Overnight Shipping)</li>
            <br />
            <h5>Total: ${order?.revenue}</h5>
          </CardContent>
        </CardContent>
        <CardContent>
          <Typography> If there are any issues, please contact customer support at 1-899-6554. </Typography>
        </CardContent>
        <CardContent className="ConfirmBtnSplit">
          <Button variant="contained" style={{ backgroundColor: 'black', width: '40%' }} onClick={() => { router.push('/client/profile'); }}> Return to Order History </Button>
        </CardContent>
      </Card>
    </>
  );
}
