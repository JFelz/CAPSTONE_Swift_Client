import React from 'react';
import {
  Typography, CardContent, Rating, CardActionArea,
} from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

export default function ClientProductCard({ prodObj }) {
  return (
    <>
      <Link href={`/client/shop/${prodObj.id}`} passHref>
        <CardActionArea sx={{
          width: 220, margin: '5px', boxShadow: '0px 0px 0px 0px', borderRadius: '0px', backgroundColor: '#F2F2F2',
        }}
        >
          {/* Fix image cards on Shop page */}
          <Image
            style={{ height: 300 }}
            src={prodObj?.imageUrl1}
            alt={prodObj?.title}
            fluid
          />
          <CardContent>
            <Rating name="read-only" value={0} readOnly />
            <Typography gutterBottom component="div" style={{ fontSize: '.85em' }}>
              {prodObj.title}
            </Typography>
            <Typography gutterBottom component="div" variant="body2" color="text.secondary" style={{ fontSize: '1em' }}>
              ${prodObj.price}
            </Typography>
          </CardContent>
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
