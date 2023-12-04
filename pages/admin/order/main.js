import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Button, Form, Modal, FloatingLabel,
} from 'react-bootstrap';
import { getUsersUID } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';
import { getAllOrders, updateOrder } from '../../../api/orderData';
import AdminOrderCard from '../../../components/admin/AdminOrderCard';
// import { useAuth } from '../../utils/context/authContext';

const initialState = {
  customerName: '',
  customerEmail: '',
  customerPhoneNumber: 0,
  streetAddress: '',
  country: '',
  townCity: '',
  state: '',
  zipcode: 0,
  revenue: 0,
  shippingMethod: '',
  status: false,
  paymentType: '',
};

export default function OrdersPage({ editOrder }) {
  const [show, setShow] = useState(false);
  const [orderFormData, setOrderFormData] = useState(initialState);
  const [currentUser, setCurrentUser] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState();

  const getOrders = () => {
    getAllOrders().then(setOrders);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(orderFormData);
  };

  const getUserId = () => {
    getUsersUID(user.uid).then(setCurrentUser);
  };

  console.log('current user:', currentUser);
  console.log('current product form data', orderFormData);
  console.log('editOrder Obj:', editOrder);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editOrder?.id) {
      updateOrder(editOrder.id, orderFormData).then(() => router.push('/admin/order/main'));
    } else {
      setOrderFormData((prevState) => ({
        ...prevState,
        dateTime: Date.now,
      }));
    }
  };

  useEffect(() => {
    getOrders();
    getUserId();

    if (editOrder.id) {
      setOrderFormData(editOrder);
      console.log('checking to see if it saves', orderFormData);
    }
  }, [editOrder.id]);

  return (
    <>
      <div>
        {editOrder.id ? <Button variant="warning" onClick={handleShow}> Edit Customer Order </Button> : '' }
      </div>
      <div>
        {orders?.map((obj) => <AdminOrderCard orderObj={obj} key={obj.id} onUpdate={getOrders} />) }
      </div>
      <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order #{editOrder.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Created on: {orderFormData.dateTime}</h4>
          <h5>Order Details</h5>
          <Form>
            <Form.Label>Customer Name</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter Customer's Name"
                name="customerName"
                value={orderFormData.customerName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>Customer Email</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter Customer's Email"
                name="customerEmail"
                value={orderFormData.customerEmail}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>Customer Phone Number</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Customer's PhoneNumber"
                name="customerPhoneNumber"
                value={orderFormData.customerPhoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Label>Street Address</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter Street Address"
                name="streetAddress"
                value={orderFormData.streetAddress}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Label>Town/City</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter Town/City"
                name="townCity"
                value={orderFormData.townCity}
                onChange={handleChange}
              />
            </Form.Group>

            <FloatingLabel controlId="floatingSelect" label="state">
              <Form.Select
                aria-label="Floating label select example"
                name="state"
                value={orderFormData.state}
                onChange={handleChange}
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

            <Form.Label>Zipcode</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Customer's Zipcode"
                name="zipcode"
                value={orderFormData.zipcode}
                onChange={handleChange}
              />
            </Form.Group>
            <FloatingLabel controlId="floatingSelect" label="country">
              <Form.Select
                aria-label="Floating label select example"
                name="country"
                value={orderFormData.country}
                onChange={handleChange}
              >
                <option>Choose a country</option>
                <option value="USA">USA</option>
              </Form.Select>
            </FloatingLabel>
            <br />
            <h5>Specifications</h5>
            <Form.Label>Revenue</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Adjust Revenue"
                name="revenue"
                value={orderFormData.revenue}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Label>Payment Type</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="Payment Type">
              <Form.Select
                aria-label="Floating label select example"
                name="paymentType"
                value={orderFormData.paymentType}
                onChange={handleChange}
              >
                <option>Update Payment Type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="american express">American Express</option>
                <option value="apple pay">Apple Pay</option>
                <option value="venmo">Venmo</option>
              </Form.Select>
            </FloatingLabel>

            <Form.Label>Shipping Method</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="Shipping Method">
              <Form.Select
                aria-label="Floating label select example"
                name="shippingMethod"
                value={orderFormData.shippingMethod}
                onChange={handleChange}
              >
                <option>Choose a shipping method</option>
                <option value="standard">Standard</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
              </Form.Select>
            </FloatingLabel>

            <Form.Label>Order Status</Form.Label>
            <FloatingLabel controlId="floatingSelect" label="Status">
              <Form.Select
                aria-label="Floating label select example"
                name="status"
                value={orderFormData.status}
                onChange={handleChange}
              >
                <option>Update Order Status</option>
                <option value>Open</option>
                <option value={false}>Closed</option>
              </Form.Select>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Body>
          <Button variant="warning" onClick={handleSubmit}> Edit Order </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

OrdersPage.propTypes = {
  editOrder: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerPhoneNumber: PropTypes.number,
    price: PropTypes.string,
    streetAddress: PropTypes.string,
    country: PropTypes.string,
    townCity: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.number,
    revenue: PropTypes.number,
    shippingMethod: PropTypes.string,
    status: PropTypes.bool,
    paymentType: PropTypes.string,
  }),
};

OrdersPage.defaultProps = {
  editOrder: initialState,
};
