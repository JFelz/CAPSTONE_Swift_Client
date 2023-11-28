import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { getCartUserUID } from '../../../api/cartData';
import CartProductCard from '../../../components/client/CartProductCard';
import { createOrder } from '../../../api/orderData';

const initialState = {
  customerUid: '',
  paymentId: 0,
  orderStatusId: 0,
  customerName: '',
  customerEmail: '',
  customerPhoneNumber: '',
  streetAddress: '',
  country: '',
  townCity: '',
  state: '',
  zipcode: 0,
  dateTime: Date.now,
  revenue: 0.00,
  shippingMethod: '',
};

export default function Cart() {
  const [currentProduct, setCurrentProducts] = useState([]);
  const [orderFormData, setOrderFormData] = useState(initialState);
  const { user } = useAuth();

  const getCartProducts = () => {
    getCartUserUID(user.uid).then(setCurrentProducts);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(orderFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...orderFormData,
      customerUid: user.uid,
      orderStatusId: 1,
    };
    createOrder(payload);
    window.location.reload();
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
                type="textarea"
                placeholder="Full Name"
                name="customerName"
                value={orderFormData.customerName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" className="SplitInputFields">
              <Form.Control
                type="textarea"
                placeholder="Email Address"
                name="customerEmail"
                value={orderFormData.customerEmail}
                onChange={handleChange}
              />
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                name="customerPhoneNumber"
                value={orderFormData.customerPhoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>COUNTRY</Form.Label>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="textarea"
                placeholder="Country"
                name="country"
                value={orderFormData.country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>STREET ADDRESS</Form.Label>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="textarea"
                placeholder="Street Address"
                name="streetAddress"
                value={orderFormData.streetAddress}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>TOWN/CITY</Form.Label>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="textarea"
                placeholder="town/city"
                name="townCity"
                value={orderFormData.townCity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>STATE</Form.Label>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="textarea"
                placeholder="State"
                name="state"
                value={orderFormData.state}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>ZIPCODE</Form.Label>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Zip Code"
                name="zipcode"
                value={orderFormData.zipcode}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Form.Label> Payment Details</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="paymentId"
              value={orderFormData.paymentId}
              onChange={handleChange}
            >
              <option>Choose a Payment option</option>
              <option value={1}>Visa</option>
              <option value={2}>Mastercard</option>
              <option value={3}>Amex</option>
              <option value={4}>Apple Pay</option>
              <option value={5}>Venmo</option>
            </Form.Select>
            <br />
            <Form.Label> Shipping Details</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="shippingMethod"
              value={orderFormData.shippingMethod}
              onChange={handleChange}
            >
              <option>Choose a Shipping method</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
            </Form.Select>
            <li>Standard: Free (3-5 Business Days)</li>
            <li>Express +$35 (1-2 Business Days)</li>
            <li>Overnight +$65 (Overnight Shipping)</li>
          </Form>
          <CardContent>
            <Typography>
              Total
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" variant="contained" className="PlaceOrderBtn" onClick={handleSubmit}>Place Order</Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
