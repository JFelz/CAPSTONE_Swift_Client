import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Card, CardContent, CardMedia, Typography,
} from '@mui/material';

export default function ConfirmProductCard({ productObj }) {
  // useEffect(() => {
  // }, []);

  return (
    <>
      <Card sx={{ display: 'flex', width: '100%', margin: '.2em' }}>
        <CardMedia
          component="img"
          style={{ height: '5em', width: '5em' }}
          image={productObj?.imageUrl1}
          alt={productObj?.title}
        />
        <CardContent sx={{
          flex: '1 0 auto', display: 'column',
        }}
        >
          <Typography component="div" style={{ fontSize: '1em' }}>
            {productObj?.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {productObj?.category}
          </Typography>
        </CardContent>
        <section style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '10em',
        }}
        >
          <Box style={{ padding: '1em' }}>
            <Typography>
              <b>{productObj?.price}</b>
            </Typography>
          </Box>
        </section>
      </Card>
    </>
  );
}

ConfirmProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    uid: PropTypes.string,
    imageUrl1: PropTypes.string,
  }).isRequired,
};
