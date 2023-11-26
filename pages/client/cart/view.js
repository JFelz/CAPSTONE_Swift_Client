import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardActions, CardContent,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../../utils/context/authContext';
import { getCartUserUID } from '../../../api/cartData';
import CartProductCard from '../../../components/client/CartProductCard';

export default function Cart() {
  const [currentProduct, setCurrentProducts] = useState();
  const { user } = useAuth();

  const getCartProducts = () => {
    getCartUserUID(user.uid).then(setCurrentProducts);
  };

  useEffect(() => {
    getCartProducts();
    console.log(currentProduct);
  }, []);

  return (
    <>
      <section className="viewProduct-top-section">
        <div>
          <Link href="/client/shop/main" passHref>
            <Button variant="contained"> Go Back </Button>
          </Link>
        </div>
      </section>
      <Card className="cartSplit" style={{ boxShadow: '0px 0px 0px 0px' }}>
        <CardContent className="LeftSideCartPage">
          {currentProduct?.map((prod) => <CartProductCard key={prod.id} productObj={prod} />)}
        </CardContent>
        <CardContent className="RightSideCartPage">
          <div> 50 </div>
          <CardActions>
            <Button size="medium" variant="contained" className="PlaceOrderBtn">Place Order</Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
