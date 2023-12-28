import React from 'react';
import { Image } from 'react-bootstrap';
import CategoryBar from '../../../components/client/FilterBar';

export default function Shop() {
  return (
    <>
      <section>
        <Image
          src="/swift-shop-herov3.svg"
          alt="Hero"
          height={200}
          fluid
        />
      </section>
      <section>
        <CategoryBar />
      </section>
    </>
  );
}
