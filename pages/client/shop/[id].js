import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image, Container, CardHeader } from 'react-bootstrap';
import {
  Button, Card, CardActions, CardContent, TextField,
} from '@mui/material';
import { getSingleProducts } from '../../../api/productData';
import { useAuth } from '../../../utils/context/authContext';
import { addToCart } from '../../../api/cartData';
import { getProductReviews } from '../../../api/reviewData';
import ClientReviewCard from '../../../components/client/ClientReviewCard';

export default function ClientProductViewPage() {
  const [product, setProduct] = useState();
  const [review, setReview] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const currentProduct = () => {
    getSingleProducts(id).then(setProduct);
  };

  const currentReviews = () => {
    getProductReviews(id).then(setReview);
  };

  console.log('reviews:', review);

  const AddToCartFunction = () => {
    addToCart(user.uid, product.id);
  };
  console.log('Product Id:', product?.id);

  useEffect(() => {
    currentProduct();
    currentReviews();
  }, []);

  return (
    <>
      <section className="viewProduct-top-section">
        <div>
          <Link href="/client/shop/main" passHref>
            <Button variant="secondary"> Go Back </Button>
          </Link>
        </div>
      </section>
      <section className="viewProduct-mid-section">
        <div className="productSplit">
          <div className="LeftSideProductPage">
            <Image
              src={product?.imageUrl1}
              alt="Product Image"
              fluid
            />
          </div>
          <Container className="RightSideProductPage">
            Right Side
            <Container className="RightContainer">
              <h1>{product?.title}</h1>
              <p> {product?.description} </p>
              <div>
                <h4> Measurements </h4>
                <p>Length: {product?.length}</p>
                <p>Width: {product?.width}</p>
                <p>Wheelbase: {product?.wheelbase}</p>
                <h4> Skate Spots </h4>
                <p>{product?.skateSpots}</p>
              </div>
              <p> Price: ${product?.price} </p>
              <section className="ViewPageCartSection">
                <Button className="CartButton" onClick={AddToCartFunction}>
                  Add To Cart
                </Button>
              </section>
            </Container>
          </Container>
        </div>
      </section>
      <section className="viewProduct-bot-section">
        <div>
          <h1> Customer Reviews </h1>
          <div>
            <Button variant="contained" sx={{ margin: '20px' }}> Add Review </Button>
          </div>
          <div style={{ margin: '20px' }}>
            <Card sx={{ maxHeight: '250px' }}>
              <CardHeader>
                <h5>{user.name}</h5>
              </CardHeader>
              <CardContent className="ReviewSubmitBody">
                <div style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="standard-required"
                    label="Subject"
                    defaultValue="Write a subject line"
                    variant="standard"
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="standard-required"
                    label="Body"
                    defaultValue="Add Review"
                    variant="standard"
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button> Submit Review </Button>
              </CardActions>
            </Card>
          </div>
          <div className="ReviewCard">
            { review[0]?.reviewList[0]?.id ? review[0]?.reviewList?.map((rev) => <ClientReviewCard key={rev.id} reviewObj={rev} />) : <h5 style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>Sorry, there arent any reviews yet</h5>}
          </div>
        </div>
      </section>
    </>
  );
}
