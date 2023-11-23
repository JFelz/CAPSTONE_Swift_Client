import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Button, Form, Modal, FloatingLabel,
} from 'react-bootstrap';
import { createNewProducts, getAllProducts, updateProducts } from '../../../api/productData';
import ProductCard from '../../../components/admin/AdminProductCard';
import { getUsersUID } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';
// import { useAuth } from '../../utils/context/authContext';

const initialState = {
  adminId: null,
  title: '',
  description: '',
  category: '',
  price: 0.00,
  length: 0.00,
  width: 0.00,
  wheelbase: 0.00,
  skatespots: '',
  imageUrl1: '',
  imageUrl2: '',
  imageUrl3: '',
};

export default function ProductsPage({ editProduct }) {
  const [show, setShow] = useState(false);
  const [productFormData, setProductFormData] = useState(initialState);
  const [currentUser, setCurrentUser] = useState({});
  const router = useRouter();
  const { user } = useAuth();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(productFormData);
  };

  const getUserId = () => {
    getUsersUID(user.uid).then(setCurrentUser);
  };

  console.log('current user:', currentUser);
  console.log('current product form data', productFormData);
  console.log('editProduct Obj:', editProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct?.id) {
      updateProducts(editProduct.id, productFormData).then(() => router.push('/admin/product/main'));
    } else {
      setProductFormData((prevState) => ({
        ...prevState,
        adminId: currentUser.id,
      }));
      createNewProducts(productFormData);
      console.log('submitted');
      window.location.reload();
    }
  };

  useEffect(() => {
    getProducts();
    getUserId();

    if (editProduct.id) {
      setProductFormData(editProduct);
      console.log('checking to see if it saves', productFormData);
    }
  }, [editProduct.id]);
  // Create button will route to a new page (or modal) to fill in information.

  // Get All products created by Admin

  // Display through cards with edit and delete buttons

  // Edit will route to a new page

  // Delete function is created in the child component below

  return (
    <>
      <div>
        {editProduct.id ? <Button variant="warning" onClick={handleShow}> Edit Product in Store </Button> : <Button variant="primary" onClick={handleShow}> Add Product to Store </Button> }
      </div>
      <div>
        {products?.map((prod) => <ProductCard productObj={prod} key={prod.id} />) }
      </div>
      <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Product Information</h5>
          <Form>
            <Form.Label>Add a Product Title</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter Title"
                name="title"
                value={productFormData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <h5>Description</h5>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                type="textarea"
                as="textarea"
                rows={3}
                placeholder="Add Product Description"
                name="description"
                value={productFormData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <FloatingLabel controlId="floatingSelect" label="category">
              <Form.Select
                aria-label="Floating label select example"
                name="category"
                value={productFormData.category}
                onChange={handleChange}
              >
                <option>Choose an option</option>
                <option value="carving">Carving</option>
                <option value="cruiser">Cruiser</option>
                <option value="dance">Dance</option>
                <option value="downhill">Downhill</option>
                <option value="pintail">Pintail</option>
                <option value="freeride">Freeride</option>
                <option value="electric">Electric</option>
                <option value="beginner">Beginner</option>
                <option value="gear">Gear</option>
              </Form.Select>
            </FloatingLabel>
            <br />
            <h5>Specifications</h5>
            <p>Length</p>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Length"
                name="length"
                value={productFormData.length}
                onChange={handleChange}
              />
            </Form.Group>
            <p>Width</p>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Width"
                name="width"
                value={productFormData.width}
                onChange={handleChange}
              />
            </Form.Group>
            <p>Wheelbase</p>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Wheelbase"
                name="wheelbase"
                value={productFormData.wheelbase}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Skate Spots</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Skate Spots"
                name="skatespots"
                value={productFormData.skatespots}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <p>Price</p>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={productFormData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <h5>Product Images</h5>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter 1st Image"
                name="imageUrl1"
                value={productFormData.imageUrl1}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter 2nd Image"
                name="imageUrl2"
                value={productFormData.imageUrl2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Control
                type="textarea"
                placeholder="Enter 3rd Image"
                name="imageUrl3"
                value={productFormData.imageUrl3}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Body>
          {editProduct.id ? <Button variant="warning" onClick={handleSubmit}> Edit Product </Button> : <Button variant="primary" onClick={handleSubmit}> Create Product </Button> }
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

ProductsPage.propTypes = {
  editProduct: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    length: PropTypes.number,
    width: PropTypes.number,
    wheelbase: PropTypes.number,
    skatespots: PropTypes.string,
    imageUrl1: PropTypes.string,
    imageUrl2: PropTypes.string,
    imageUrl3: PropTypes.string,
  }),
};

ProductsPage.defaultProps = {
  editProduct: initialState,
};
