import React from 'react';
import { Image } from 'react-bootstrap';
import CategoryBar from '../../../components/client/FilterBar';

export default function Shop() {
  return (
    <>
      <section>
        <Image
          src="/swift-shop-herov3.svg"
          fluid
        />
      </section>
      <section>
        <CategoryBar />
      </section>
    </>
  );
}
