import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProducts } from '../../../../api/productData';
import ProductsPage from '../main';

export default function EditProduct() {
  const [editProduct, setEditProduct] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProducts(id).then(setEditProduct);
  }, [id]);

  return (
    <>
      <h1> {editProduct?.title} </h1>
      <ProductsPage editProduct={editProduct} />
    </>
  );
}
