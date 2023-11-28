import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { getCartUserUID } from '../../../api/cartData';
import CartProductCard from '../../../components/client/CartProductCard';
// import { createOrder } from '../../../api/orderData';

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
  status: false,
  shippingMethod: '',
  paymentType: '',
};

export default function Cart() {
  const [currentProduct, setCurrentProducts] = useState([]);
  const [orderFormData, setOrderFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const getCartProducts = () => {
    getCartUserUID(user.uid).then(setCurrentProducts);
  };

  const toggleBtnVisibility = () => {
    setSubmitted(true);
  };

  console.log(submitted);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(orderFormData);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     ...orderFormData,
  //     customerUid: user.uid,
  //     status: true,
  //   };
  //   createOrder(payload).then(setSubmitted(true));
  // };

  const handleCheckout = (e) => {
    e.preventDefault();

    // ** This will be in the confirmation page **

    // Retrieve order based off UID and active status - store in state

    // Retrieve cart data and store it in state

    // If statement to check if order exists in state

    /* if true: loop through the cart state.
    if (orderState) {
      foreach(var x in cartState) {
      addProductsToOrder(user.uid, x.Id)
      }
      router.push('client/order/confirmationPage');
    }
     */
  };

  useEffect(() => {
    getCartProducts();
    handleCheckout();
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
              value={orderFormData.paymentType}
              onChange={handleChange}
            >
              <option>Choose a Payment option</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="american express">Amex</option>
              <option value="apple pay">Apple Pay</option>
              <option value="venmo">Venmo</option>
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
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="overnight">Overnight</option>
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
            {!submitted ? (<Button size="medium" id="PlaceOrder" variant="contained" className="PlaceOrderBtn" onClick={toggleBtnVisibility}>Place Order</Button>) : (
              <Button
                size="medium"
                id="PlaceOrder"
                variant="outlined"
                className="CheckoutBtn"
                style={{
                  color: 'white', backgroundColor: '#4cd480', border: '0px', boxShadow: ' #bebebe 2px 2px 2px 0px',
                }}
              >Proceed to Checkout
              </Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
