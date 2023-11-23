import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleProducts } from '../../../api/productData';

export default function ProductViewPage() {
  const [product, setProduct] = useState();
  const router = useRouter();
  const { id } = router.query;

  const currentProduct = () => {
    getSingleProducts(id).then(setProduct);
  };

  useEffect(() => {
    currentProduct();
  }, []);

  return (
    <>
      <section className="viewProduct-top-section">
        <div>
          <Link href="/admin/product/main" passHref>
            <Button variant="secondary"> Go Back </Button>
          </Link>
        </div>
      </section>
      <section className="viewProduct-mid-section">
        <div className="productSplit">
          <div className="LeftSideProductPage">
            Left Side
          </div>
          <div className="RightSideProductPage">
            Right Side
            <h1>{product?.title}</h1>
            <p> {product?.description} </p>
            <div>
              <h4> Measurements </h4>
              <p>Length: {product?.length}</p>
              <p>Width: {product?.width}</p>
              <p>Wheelbase: {product?.wheelbase}</p>
              <h4> Skate Spots </h4>
              <p>{product?.skatespots}</p>
            </div>
            <p> Price: ${product?.price} </p>
            <section className="ViewPageCartSection">
              <Button className="CartButton">
                Add To Cart
              </Button>
            </section>
          </div>
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
