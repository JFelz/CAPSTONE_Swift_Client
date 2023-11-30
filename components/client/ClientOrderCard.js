import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import {
  Box, Card, Typography, CardContent, CardMedia,
} from '@mui/material';

export default function ClientOrderCard({ orderObj }) {
  // const deleteCurrentProduct = () => {
  //   if (window.confirm(`Delete Order #${orderObj.id}?`)) {
  //     deleteOrder(orderObj.id);
  //   }
  //   window.location.reload();
  // };

  return (
    <>
      <Card sx={{ display: 'flex', height: '85px' }}>
        <CardContent>
          <Typography component="div" variant="p">
            Order#: {orderObj.id}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="p">
              {orderObj.customerName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {orderObj.customerEmail}
            </Typography>
          </CardContent>
          <Box sx={{
            display: 'flex', alignItems: 'center', pl: 1, pb: 1,
          }}
          >
            <Typography component="div" variant="p">
              {orderObj.shippingMethod}
            </Typography>
            <Typography component="div" variant="p">
              {orderObj.paymentType}
            </Typography>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
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
    paymentType: PropTypes.string,
  }).isRequired,
};
