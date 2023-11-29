import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box, Button, Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { getSingleProducts } from '../../api/productData';
import { deleteCartProduct } from '../../api/cartData';
import { useAuth } from '../../utils/context/authContext';

export default function CartProductCard({ orderObj }) {
  const [materialObj, setMaterialObj] = useState([]);
  const { user } = useAuth();

  const deleteProd = () => {
    if (window.confirm(`Delete ${orderObj.title}?`)) {
      deleteCartProduct(user.uid, orderObj.id);
    }
    window.location.reload();
  };

  console.log(user.uid, materialObj.id);

  const getMaterialObj = () => {
    getSingleProducts(orderObj.id).then(setMaterialObj);
  };

  useEffect(() => {
    getMaterialObj();
  }, []);

  return (
    <>
      <Card sx={{ display: 'flex', width: '100%', margin: '.2em' }}>
        <CardMedia
          component="img"
          style={{ height: '5em', width: '5em' }}
          image={orderObj.imageUrl1}
          alt={orderObj.title}
        />
        <CardContent sx={{
          flex: '1 0 auto', display: 'column',
        }}
        >
          <Typography component="div" style={{ fontSize: '1em' }}>
            {orderObj.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {orderObj.category}
          </Typography>
        </CardContent>
        <section style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '10em',
        }}
        >
          <Box style={{ padding: '1em' }}>
            <Typography>
              <b>{orderObj.price}</b>
            </Typography>
          </Box>
          <Link href={`/client/shop/${orderObj.id}`} passHref>
            <Button
              variant="outlined"
              style={{
                height: '3em', display: 'flex', flexDirection: 'row', alignItems: 'center',
              }}
            >
              <VisibilityIcon />
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={deleteProd}
            style={{
              height: '3em', display: 'flex', flexDirection: 'row', alignItems: 'center',
            }}
          >
            <DeleteIcon />
          </Button>
        </section>
      </Card>
    </>
  );
}

CartProductCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    uid: PropTypes.string,
    imageUrl1: PropTypes.string,
  }).isRequired,
};
