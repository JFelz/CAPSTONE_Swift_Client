import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../api/productData';

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
        <div> Filter </div>
      </section>
      {/* end section */}
      <section>
        {currentProducts}
        {/* {currentProducts?.map((prod) => <> )} */}
      </section>
    </>
  );
}
