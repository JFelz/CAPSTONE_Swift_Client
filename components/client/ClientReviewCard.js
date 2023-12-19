import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { Rating } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useAuth } from '../../utils/context/authContext';

export default function ClientReviewCard({ reviewObj }) {
  const { user } = useAuth();

  return (
    <>
      <Card sx={{ maxHeight: '200px', marginBottom: '10px' }}>
        <div className="ReviewCardHeader">
          <Rating name="read-only" value={reviewObj.rating} readOnly />
          <h5>{reviewObj?.subject}</h5>
          <h6>{user?.name}</h6>
        </div>
        <div className="ReviewCardContent">
          <p>{reviewObj?.content}</p>
        </div>
        <CardActions>
          <div>
            Edit
          </div>
        </CardActions>
      </Card>
    </>
  );
}

ClientReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    customerUid: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
