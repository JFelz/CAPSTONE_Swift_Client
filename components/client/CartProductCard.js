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

export default function CartProductCard({ orderObj, onUpdate }) {
  const [materialObj, setMaterialObj] = useState([]);
  const { user } = useAuth();

  const getMaterialObj = () => {
    getSingleProducts(orderObj?.id).then(setMaterialObj);
  };

  console.log('before delete', materialObj);

  const deleteProd = () => {
    if (window.confirm(`Delete ${orderObj.title}?`)) {
      deleteCartProduct(user.uid, orderObj.id).then(() => onUpdate());
    }
  };

  console.log('after delete', materialObj);

  useEffect(() => {
    getMaterialObj();
  }, []);

  return (
    <>
      <Card sx={{
        display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', maxWidth: '40vw', maxHeight: '100px', margin: '.2em',
      }}
      >
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
          <Typography className="productCardTitle" style={{ width: '15vw', fontSize: '1vw' }}>
            {orderObj.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" style={{ width: '15vw', fontSize: '1vw' }}>
            {orderObj.category}
          </Typography>
        </CardContent>
        <section style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '10em',
        }}
        >
          <Box style={{ width: '10vw', padding: '1em' }}>
            <Typography style={{ width: '15vw', fontSize: '1vw' }}>
              <b>{orderObj.price}</b>
            </Typography>
          </Box>
          <Link href={`/client/shop/${orderObj.id}`} passHref>
            <Button
              variant="outlined"
              style={{
                height: '5vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '5vw',
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
  onUpdate: PropTypes.func.isRequired,
};
