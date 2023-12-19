import React, { useState } from 'react';
import {
  Typography, CardContent, Rating, CardActionArea, CardMedia, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ClientProductCard({ prodObj }) {
  const [value, setValue] = useState();
  return (
    <>
      <Link href={`/client/shop/${prodObj.id}`} passHref>
        <CardActionArea sx={{
          width: 220, margin: '5px', boxShadow: '0px 0px 0px 0px', borderRadius: '0px', backgroundColor: '#F2F2F2',
        }}
        >
          <CardMedia
            sx={{ height: 300 }}
            image={prodObj?.imageUrl1}
            title="green iguana"
          />
          <CardContent>
            <Rating name="read-only" value={value} readOnly />
            <Typography gutterBottom component="div" style={{ fontSize: '.85em' }}>
              {prodObj.title}
            </Typography>
            <Typography gutterBottom component="div" variant="body2" color="text.secondary" style={{ fontSize: '1em' }}>
              ${prodObj.price}
            </Typography>
          </CardContent>
          <Button onClick={setValue}> Remove Me </Button>
        </CardActionArea>
      </Link>
    </>
  );
}

ClientProductCard.propTypes = {
  prodObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    length: PropTypes.number,
    width: PropTypes.number,
    wheelbase: PropTypes.number,
    skateSpots: PropTypes.string,
    imageUrl1: PropTypes.string,
    imageUrl2: PropTypes.string,
    imageUrl3: PropTypes.string,
  }).isRequired,
};
