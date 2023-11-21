import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteProduct } from '../../api/productData';

export default function ProductCard({ productObj }) {
  const deleteCurrentProduct = () => {
    if (window.confirm(`Delete ${productObj.title}?`)) {
      deleteProduct(productObj.id);
    }
  };

  return (
    <>
      <Card style={{
        display: 'flex',
        flexDirection: 'row',
        height: '85px',
        width: '99.8%',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer',
        borderTopWidth: '5px',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        borderBottomWidth: '0px',
        borderTopColor: '#383838',
        boxSizing: 'content-box',
        backgroundColor: '#18181C',
        borderRadius: '0px',
      }}
      >
        <Card.Img
          src={productObj.imageUrl1}
          alt={productObj.title}
          style={{
            height: '100%',
            width: '7em',
          }}
        />
        <Card.Body style={{ marginTop: '5px' }}>
          <Card.Title
            style={{
              minHeight: '15px',
              fontFamily: 'Poppins',
              fontWeight: 'Bold',
              fontSize: '16px',
            }}
          >{productObj.title}
          </Card.Title>
          <Card.Subtitle style={{
            fontFamily: 'Poppins',
            fontWeight: 'normal',
            color: '#979797',
            fontSize: '13px',
          }}
          > {productObj.category}
          </Card.Subtitle>

        </Card.Body>

        <Card.Body style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          width: '15px',
        }}
        >
          <Card.Body style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px',
            alignItems: 'end',
          }}
          >
            <Card.Text style={{ marginBottom: '5px', width: '50px', fontFamily: 'Poppins' }}><b>Price</b></Card.Text>
            <Card.Text style={{ width: '70px', color: '#7BD45C' }}>USD ${productObj.price}</Card.Text>
          </Card.Body>
        </Card.Body>
        <Button> Edit </Button>
        <Button variant="danger" onClick={deleteCurrentProduct}> Delete </Button>
      </Card>
    </>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    uid: PropTypes.string,
    imageUrl1: PropTypes.string,
  }).isRequired,
};
