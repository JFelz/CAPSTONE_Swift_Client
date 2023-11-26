import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Image, Container } from 'react-bootstrap';
import { getSingleProducts } from '../../../api/productData';
import { useAuth } from '../../../utils/context/authContext';
import { addToCart } from '../../../api/cartData';

export default function ClientProductViewPage() {
  const [product, setProduct] = useState();
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const currentProduct = () => {
    getSingleProducts(id).then(setProduct);
  };

  const handleSubmit = () => {
    const payload = {
      ProductId: product.id,
      CustomerUid: user.uid,
    };
    addToCart(payload);
  };

  useEffect(() => {
    currentProduct();
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

            {/* Main image is a displayer. You have a row of buttons on the bottom. The productObj is already pulling in the images and storing it in state. On onClick command, you display X image on the main image display component.

            For an image display, you would store one image in state. The button updates that state with the new image you click.

            Look at LandYachtz and see how they do their sizing for the right section of their page. #Devtools
            */}

            {/* <div className="BottomRowImages">
              <Image
                src={product?.imageUrl2}
                alt="Product Image"
                width={100}
                height={110}
              />
            </div> */}
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
                <Button className="CartButton" onClick={handleSubmit}>
                  Add To Cart
                </Button>
              </section>
            </Container>
          </Container>
        </div>
      </section>
      <section className="viewProduct-bot-section">
        <div>
          Comment Section
        </div>
      </section>
    </>
  );
}
