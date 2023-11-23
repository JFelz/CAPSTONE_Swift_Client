import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function DeleteMe() {
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
            <h1>Longboard Title</h1>
            <p> Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. </p>
            <div>
              <h4> Measurements </h4>
              <h4> Skate Spots </h4>
            </div>
            <p> Price Amount </p>
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
