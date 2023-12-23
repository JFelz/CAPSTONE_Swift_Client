import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { Button, Rating } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useAuth } from '../../utils/context/authContext';
import { deleteReview } from '../../api/reviewData';

export default function ClientReviewCard({ reviewObj, onUpdate }) {
  const { user } = useAuth();

  const deleteCurrentReview = () => {
    if (window.confirm(`Are you sure you want to delete this review? ${reviewObj?.id})`)) {
      deleteReview(reviewObj?.id).then(() => onUpdate());
    }
  };

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
          { reviewObj?.customerUid === user?.uid ? (
            <Button onClick={deleteCurrentReview}> Delete </Button>
          ) : ('')}
        </CardActions>
      </Card>
    </>
  );
}

ClientReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customerUid: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
