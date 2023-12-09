import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getAllProducts } from '../../../api/productData';
import ClientProductCard from '../../../components/client/ClientProductCard';

export default function Shop() {
  const [currentProducts, setCurrentProducts] = useState();

  const retrieveProduct = () => {
    getAllProducts().then(setCurrentProducts);
  };

  useEffect(() => {
    retrieveProduct();
  }, []);

  return (
    <>
      <section>
        {/* <h1 className="ShopTitle">  LONGBOARDS </h1> */}
        <Image
          src="/swift-shop-herov3.svg"
          fluid
        />
      </section>
      <section>
        <div> Filter </div>
      </section>
      <section className="RenderCards">
        {currentProducts?.map((prod) => <ClientProductCard key={prod.id} prodObj={prod} />)}
      </section>
    </>
  );
}
