import React, { useState, useEffect } from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';
import { getAllProducts } from '../../api/productData';
import ProductCard from '../../components/admin/AdminProductCard';
// import { useAuth } from '../../utils/context/authContext';

export default function ProductsPage() {
  const [show, setShow] = useState(false);
  // const { user } = useAuth();
  const [products, setProducts] = useState();

  const getProducts = () => {
    getAllProducts().then(setProducts);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getProducts();
  });
  // Create button will route to a new page (or modal) to fill in information.

  // Get All products created by Admin

  // Display through cards with edit and delete buttons

  // Edit will route to a new page

  // Delete function is created in the child component below
  return (
    <>
      <div>
        <Button onClick={handleShow}>Add Product to Shop</Button>
      </div>
      <div>
        <h4> Render Product Cards with Edit and Delete functions</h4>
        {products?.map((prod) => <ProductCard productObj={prod} key={prod.id} />) }
      </div>
      <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
        <Modal.Header closeButton>
          <Modal.Title>title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Enter Donation Amount</h5>
          {/* <Form>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                name="donationAmount"
                value={}
                onChange={handleChange}
              />
            </Form.Group> */}

          <h5>Comment</h5>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Add a Comment</Form.Label>
              <Form.Control
                type="textarea"
                as="textarea"
                rows={3}
                placeholder="Say Something..."
                name="comment"
                value={donationFormData.comment}
                onChange={handleChange}
              />
            </Form.Group>
            <FloatingLabel controlId="floatingSelect" label="Payment Method">
              <Form.Select
                aria-label="Floating label select example"
                name="paymentType"
                value={donationFormData.paymentType}
                onChange={handleChange}
              >
                <option>Choose an option</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="venmo">Venmo</option>
              </Form.Select>
            </FloatingLabel>
          </Form> */}
          <br />
          <h5> Total Amount: {25.99} </h5>
        </Modal.Body>
        <Modal.Body>
          <Button variant="success">
            Submit Donation
          </Button>
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
