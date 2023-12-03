import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Box, Card, Typography, CardContent, CardActionArea, Button,
} from '@mui/material';
import { getProductsFromOrder } from '../../api/orderData';

export default function ClientOrderCard({ orderObj }) {
  const [productList, setProductList] = useState();

  const getProductList = () => {
    getProductsFromOrder(orderObj.id).then(setProductList);
  };

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
        <CardContent>
          <Typography component="div" variant="p">
            Order#: {orderObj?.id}
          </Typography>
          <Typography component="div" variant="p">
            Status: {orderObj?.status ? 'Open' : 'Closed'}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="p">
              {orderObj?.customerName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {orderObj?.customerEmail}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        >
          <Typography component="div" variant="p">
            Total: {orderObj?.revenue}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        >
          <Typography component="div" variant="p">
            Created on: {orderObj?.dateTime}
          </Typography>
        </Box>
        <CardActionArea>
          <Link passHref href={`/client/order/${orderObj.id}`}>
            <Button size="small" variant="text">View Reciept</Button>
          </Link>
        </CardActionArea>
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
