import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Carousel, Container, Image } from 'react-bootstrap';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Button, Card, CardActions, Rating, TextField, Typography,
} from '@mui/material';
import { getSingleProducts } from '../../../api/productData';
import { useAuth } from '../../../utils/context/authContext';
import { addToCart } from '../../../api/cartData';
import { addProductReview, getProductReviews } from '../../../api/reviewData';
import ClientReviewCard from '../../../components/client/ClientReviewCard';

export default function ClientProductViewPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState();
  const [review, setReview] = useState([]);
  const [reviewData, setReviewData] = useState({
    subject: '',
    content: '',
    customerUid: user?.uid,
    rating: 0,
  });

  const currentProduct = () => {
    getSingleProducts(id).then(setProduct);
  };

  const currentReviews = () => {
    getProductReviews(id).then(setReview);
  };

  const handleShow = () => {
    setShow(true);
  };

  console.log('Current show value:', show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === 'rating' ? parseFloat(value) : value;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
    console.log(reviewData);
  };

  console.log('UID:', user?.uid);

  const handleSubmit = async () => {
    try {
      if (user?.uid) {
        setReviewData((prevState) => ({
          ...prevState,
        }));
        const payload = {
          ...reviewData,
        };
        await addProductReview(id, payload);
        setShow(false);
        setReviewData(null);
      }
    } catch (err) {
      alert('Problem:', err);
    }
  };

  const onUpdate = () => {
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
            <Card sx={{ width: '100%', height: '100%' }}>
              <Carousel>
                <Carousel.Item>
                  <Image
                    width={700}
                    height={700}
                    className="d-block w-100"
                    src={product?.imageUrl1}
                    alt={product?.title}
                    style={{ objectFit: 'contain', borderRadius: '10px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    width={700}
                    height={700}
                    className="d-block w-100"
                    src={product?.imageUrl2}
                    alt={product?.title}
                    style={{ objectFit: 'contain', borderRadius: '10px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    width={700}
                    height={700}
                    className="d-block w-100"
                    src={product?.imageUrl3}
                    alt={product?.title}
                    style={{ objectFit: 'contain', borderRadius: '10px' }}
                  />
                </Carousel.Item>
              </Carousel>
            </Card>
          </div>
          <Container className="RightSideProductPage">
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
                <Button id="CartButton" variant="contained" onClick={AddToCartFunction}>
                  Add To Cart
                </Button>
              </section>
            </Container>
          </Container>
        </div>
      </section>
      <section className="viewProduct-bot-section">
        <div>
          <h1 style={{ marginTop: '4%' }}> Customer Reviews </h1>
          <div>
            <Button variant="contained" id="ShowSubmitReview" onClick={handleShow}> Submit A Review </Button>
          </div>
        </div>
        { show
          ? (
            <>
              <Card sx={{ marginBottom: '20px' }}>
                <div style={{ margin: '20px' }}>
                  <div>
                    <h5>{user.name}</h5>
                  </div>
                  <div className="ReviewSubmitBody">
                    <Typography> Overall Rating </Typography>
                    <Rating
                      name="rating"
                      defaultValue={0}
                      value={reviewData?.rating}
                      onChange={handleChange}
                      precision={1}
                    />
                  </div>
                  <div className="Disclaimer">
                    <ErrorIcon />
                    <Typography style={{ fontSize: '15px' }}> Please press the submit button at the bottom in order to save your changes </Typography>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <TextField
                      required
                      id="standard-required"
                      label="Add a headline"
                      name="subject"
                      value={reviewData?.subject}
                      onChange={handleChange}
                      variant="standard"
                      style={{ width: '50%' }}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-multiline-static"
                      label="Write your review"
                      name="content"
                      value={reviewData?.content}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      variant="outlined"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <CardActions sx={{ paddingTop: '20px' }}>
                    <Button variant="contained" id="CommentBtn" onClick={() => { handleSubmit().then(() => onUpdate()); }}> Submit </Button>
                    <Button variant="outline" onClick={() => { setShow(false); }}> Cancel </Button>
                  </CardActions>
                </div>
              </Card>
            </>
          ) : ('')}
        <div className="ReviewCard">
          { review[0]?.reviewList[0]?.id ? review[0]?.reviewList?.map((rev) => <ClientReviewCard key={rev.id} reviewObj={rev} onUpdate={currentReviews} />) : <h5 style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>No reviews yet</h5>}
        </div>
      </section>
    </>
  );
}
