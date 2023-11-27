import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { getCartUserUID } from '../../../api/cartData';
import CartProductCard from '../../../components/client/CartProductCard';

export default function Cart() {
  const [currentProduct, setCurrentProducts] = useState([]);
  const { user } = useAuth();

  const getCartProducts = () => {
    getCartUserUID(user.uid).then(setCurrentProducts);
  };

  console.log(currentProduct);

  useEffect(() => {
    getCartProducts();
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
          {currentProduct[0]?.map((prod) => <CartProductCard key={prod.id} productObj={prod} />)}
        </CardContent>
        <CardContent className="RightSideCartPage">
          <Form>
            <Form.Label> BILLING INFORMATION </Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> PERSONAL DETAILS </Form.Label>
              <Form.Control
                type="name"
                placeholder="Full Name"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" className="SplitInputFields">
              <Form.Control
                type="email"
                placeholder="Email Address"
              />
              <Form.Control
                type="number"
                placeholder="Phone Number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>COUNTRY</Form.Label>
              <Form.Control
                type="name"
                placeholder="Street Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>STREET ADDRESS</Form.Label>
              <Form.Control
                type="name"
                placeholder="Street Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>TOWN/CITY</Form.Label>
              <Form.Control
                type="name"
                placeholder="Street Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>STATE</Form.Label>
              <Form.Control
                type="name"
                placeholder="Street Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ZIP CODE</Form.Label>
              <Form.Control
                type="name"
                placeholder="Street Address"
              />
            </Form.Group>
          </Form>
          <CardContent>
            <Typography>
              Total
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" variant="contained" className="PlaceOrderBtn">Place Order</Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
