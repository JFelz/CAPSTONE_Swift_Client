import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import { FloatingLabel, Form } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../../utils/context/authContext';
import { deleteAllCart, getCartUserUID } from '../../../api/cartData';
import CartProductCard from '../../../components/client/CartProductCard';
import {
  addProductToOrder, createOrder,
} from '../../../api/orderData';
import { returnUserUID } from '../../../api/userData';

const initialState = {
  customerUid: '',
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
  const [cartData, setCartData] = useState([]);
  const [orderFormData, setOrderFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [validCashier, setValidCashier] = useState();
  const router = useRouter();
  const { user } = useAuth();

  const checkingUser = () => {
    returnUserUID(user.uid).then(setValidCashier);
    console.log('VC', validCashier);
  };

  const pushRoute = () => {
    router.push('/register');
  };

  const getCartProducts = () => {
    getCartUserUID(user.uid).then(setCartData);
    console.log(cartData);
  };

  let totalRevenue = 0;
  const calculateRevenue = () => {
    cartData?.map((obj) => obj.map((x) => {
      totalRevenue += x.price;
      return totalRevenue;
    }));

    if (orderFormData.shippingMethod === 'express') {
      totalRevenue += 35;
    } else if (orderFormData.shippingMethod === 'overnight') {
      totalRevenue += 65;
    }
  };

  calculateRevenue();

  console.log('totalRevenue', totalRevenue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log('cartData:', cartData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderPayload = {
      ...orderFormData,
      customerUid: user?.uid,
      revenue: totalRevenue,
      status: true,
    };
    createOrder(orderPayload).then(setSubmitted(true));
  };

  console.log(orderFormData);

  const handleCheckout = async () => {
    addProductToOrder(user.uid);
    await deleteAllCart(user.uid);

    await router.push('/client/order/confirmation');
  };

  useEffect(() => {
    getCartProducts();
    checkingUser();
  }, []);

  return (
    <>
      {validCashier === 'Sorry, Customer not found!' ? (
        pushRoute()
      ) : (
        <>
          <section className="viewProduct-top-section">
            <div>
              <p>My Cart</p>
            </div>
          </section>
          <Link href="/client/shop/main" passHref>
            <Button variant="contained" style={{ backgroundColor: 'black', margin: '1em', borderRadius: '4px' }}> Return to Shop </Button>
          </Link>
          <Card className="cartSplit" style={{ boxShadow: '0px 0px 0px 0px', height: '100%', backgroundColor: '#F2F2F2' }}>
            <CardContent className="LeftSideCartPage">
              {cartData[0]?.map((prod) => <CartProductCard key={prod.id} orderObj={prod} onUpdate={getCartProducts} />)}
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
                    required
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2" className="SplitInputFields">
                  <Form.Control
                    type="textarea"
                    placeholder="Email Address"
                    name="customerEmail"
                    value={orderFormData.customerEmail}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control
                    type="number"
                    placeholder="Enter Phone Number"
                    name="customerPhoneNumber"
                    value={orderFormData.customerPhoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Label>STREET ADDRESS</Form.Label>
                <Form.Group controlId="exampleForm.ControlInput3">
                  <Form.Control
                    type="textarea"
                    placeholder="Street Address"
                    name="streetAddress"
                    value={orderFormData.streetAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Label>TOWN/CITY</Form.Label>
                <Form.Group controlId="exampleForm.ControlInput4">
                  <Form.Control
                    type="textarea"
                    placeholder="town/city"
                    name="townCity"
                    value={orderFormData.townCity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Label>ZIPCODE</Form.Label>
                <Form.Group controlId="exampleForm.ControlInput5">
                  <Form.Control
                    type="number"
                    placeholder="Zip Code"
                    name="zipcode"
                    value={orderFormData.zipcode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Label>STATE</Form.Label>
                <FloatingLabel controlId="floatingSelect" label="state">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="state"
                    value={orderFormData.state}
                    onChange={handleChange}
                    required
                  >
                    <option>Choose a state</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </Form.Select>
                </FloatingLabel>
                <Form.Label> Country </Form.Label>
                <FloatingLabel controlId="floatingSelect" label="country">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="country"
                    value={orderFormData.country}
                    onChange={handleChange}
                    required
                  >
                    <option>Choose a country</option>
                    <option value="USA">USA</option>
                  </Form.Select>
                </FloatingLabel>
                <br />
                <Form.Label> Payment Details</Form.Label>
                <Form.Select
                  aria-label="Floating label select example"
                  name="paymentType"
                  value={orderFormData.paymentType}
                  onChange={handleChange}
                  required
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
                  required
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
                <Typography style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                  Total: ${totalRevenue}
                </Typography>
              </CardContent>
              <CardActions>
                {!submitted ? (<Button size="medium" variant="contained" className="PlaceOrderBtn" onClick={handleSubmit}>Place Order</Button>) : (
                  <Button
                    size="medium"
                    variant="contained"
                    className="CheckoutBtn"
                    onClick={handleCheckout}
                  >Proceed to Checkout
                  </Button>
                )}
              </CardActions>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
