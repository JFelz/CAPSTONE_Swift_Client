import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Card, Typography, CardContent, Button,
} from '@mui/material';
import { getProductsFromOrder } from '../../api/orderData';

export default function ClientOrderCard({ orderObj }) {
  const [productList, setProductList] = useState();

  const getProductList = () => {
    getProductsFromOrder(orderObj.id).then(setProductList);
  };

  const purchasedDate = orderObj?.dateTime;
  const formattedDate = purchasedDate ? new Date(purchasedDate).toDateString() : '';

  console.log('product list:', productList);

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <Card sx={{
        display: 'flex', height: 'auto', marginBottom: '10px', width: '100%',
      }}
      >
        <CardContent className="Section1">
          <Typography className="Section1b" component="div" variant="p">
            Order#: {orderObj?.id}
          </Typography>
          <Typography component="div" variant="p">
            Status: {orderObj?.status ? 'Open' : 'Closed'}
          </Typography>
        </CardContent>
        <CardContent className="Section2">
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="p">
              {orderObj?.customerName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {orderObj?.customerEmail}
            </Typography>
          </CardContent>
        </CardContent>
        <CardContent className="Section3">
          <Typography className="Section3" component="div" variant="p">
            Total: ${orderObj?.revenue}
          </Typography>
        </CardContent>
        <CardContent className="Section4">
          <Typography className="Section4b" component="div" variant="p">
            Purchased: {formattedDate}
          </Typography>
        </CardContent>
        <CardContent className="Section5">
          <Link passHref href={`/client/order/${orderObj.id}`}>
            <Button className="Section5b" variant="text">View Reciept</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}

ClientOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerUid: PropTypes.string,
    shippingMethod: PropTypes.string,
    dateTime: PropTypes.string,
    paymentType: PropTypes.string,
    status: PropTypes.bool,
    revenue: PropTypes.number,
  }).isRequired,
};
