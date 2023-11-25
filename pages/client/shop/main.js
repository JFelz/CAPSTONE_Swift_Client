import React, { useEffect, useState } from 'react';
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
        <div> Filter </div>
      </section>
      {/* end section */}
      <section className="RenderCards">
        {currentProducts?.map((prod) => <ClientProductCard key={prod.id} prodObj={prod} />)}
      </section>
    </>
  );
}
