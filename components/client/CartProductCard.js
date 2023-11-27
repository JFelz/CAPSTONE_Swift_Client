import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import {
  Box, CardContent, CardMedia, Typography,
} from '@mui/material';
import { getSingleProducts } from '../../api/productData';
import { deleteCartProduct } from '../../api/cartData';
import { useAuth } from '../../utils/context/authContext';

export default function CartProductCard({ productObj }) {
  const [materialObj, setMaterialObj] = useState([]);
  const { user } = useAuth();

  const deleteProd = () => {
    if (window.confirm(`Delete ${productObj.title}?`)) {
      deleteCartProduct(user.uid, productObj.id);
    }
    window.location.reload();
  };

  console.log(user.uid, materialObj.id);

  const getMaterialObj = () => {
    getSingleProducts(productObj.id).then(setMaterialObj);
  };

  useEffect(() => {
    getMaterialObj();
  }, []);

  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={productObj.imageUrl1}
            alt={productObj.title}
          />
          <CardContent sx={{ flex: '1 0 auto', display: 'column', alignItems: 'flex-end' }}>
            <Typography component="div" style={{ fontSize: '1em' }}>
              {productObj.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {productObj.category}
            </Typography>
          </CardContent>
          <Box sx={{
            display: 'flex', alignItems: 'center', pl: 1, pb: 1,
          }}
          />
          <Link href={`/client/shop/${productObj.id}`} passHref>
            <Button variant="info"> Preview </Button>
          </Link>
          <Button variant="danger" onClick={deleteProd}> Delete </Button>
        </Box>
      </Card>
    </>
  );
}

CartProductCard.propTypes = {
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
