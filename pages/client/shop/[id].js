import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Image, Container } from 'react-bootstrap';
import { getSingleProducts } from '../../../api/productData';
import { useAuth } from '../../../utils/context/authContext';
import { addToCart } from '../../../api/cartData';
import { getProductReviews } from '../../../api/reviewData';
import ClientReviewCard from '../../../components/client/ClientReviewCard';

export default function ClientProductViewPage() {
  const [product, setProduct] = useState();
  const [review, setReview] = useState();
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
            {review?.map((rev) => <ClientReviewCard key={rev.id} reviewObj={rev} />)}
          </div>
        </div>
      </section>
    </>
  );
}
