import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import {
  getProductsFromOrder, getSingleActiveOrder, updateOrder,
} from '../../../api/orderData';
import { useAuth } from '../../../utils/context/authContext';
import ClientProdListCard from '../../../components/client/ClientProdListCard';

export default function OrderConfirmationPage() {
  const [activeOrder, setActiveOrder] = useState();
  const [fullProd, setFullProd] = useState();
  const router = useRouter();
  const { user } = useAuth();

  const getOrderData = () => {
  //   Get newly created Order to tag products to
    getSingleActiveOrder(user?.uid).then(setActiveOrder);
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
      <Card className="ConfirmationCard">
        <div className="ConfirmationHeader">
          <h5>Thank you!</h5>
          <h2> YOUR ORDER HAS BEEN RECEIVED</h2>
        </div>
        <div className="ConfirmationSubHeader">
          <p> Your order #{activeOrder?.id} is being processed. An email was sent to {activeOrder?.customerEmail} with your <u>order receipt</u>.</p>
        </div>
        <CardContent>
          <div>
            <h4> Purchased Products </h4>
            {fullProd?.map((orderObj) => <ClientProdListCard key={orderObj?.id} orderObj={orderObj} />)}
          </div>
        </CardContent>
        <CardContent className="ConfirmationSplit">
          <CardContent className="ConfirmationLeft">
            <h6> Shipping To: </h6>
            <p>{activeOrder?.customerName}</p>
            <p>{activeOrder?.streetAddress}</p>
            <p>{activeOrder?.townCity}</p>
            <p>{activeOrder?.zipcode}</p>
            <p>{activeOrder?.state}</p>
            <p>{activeOrder?.country}</p>
          </CardContent>
          <CardContent className="ConfirmationRight">
            <h6><b>Email:</b> {activeOrder?.customerEmail}</h6>
            <h6><b>Phone Number:</b> {activeOrder?.customerPhoneNumber}</h6>
            <h6><b>Payment Type:</b> {activeOrder?.paymentType}</h6>
            <h6><b>Shipping Method:</b> {activeOrder?.shippingMethod}</h6>
            <li>Standard: Free (3-5 Business Days)</li>
            <li>Express +$35 (1-2 Business Days)</li>
            <li>Overnight +$65 (Overnight Shipping)</li>
            <br />
            <h5>Total: ${activeOrder?.revenue}</h5>
          </CardContent>
        </CardContent>
        <CardContent className="ConfirmBtnSplit">
          <Button variant="contained" style={{ backgroundColor: 'black', width: '40%' }} onClick={() => { router.push('/'); }}> Return to Homepage </Button>
          <br />
          <Button variant="contained" style={{ backgroundColor: 'black', width: '40%' }} onClick={() => { router.push('/client/profile'); }}> View Order History </Button>
        </CardContent>
      </Card>
    </>
  );
}
