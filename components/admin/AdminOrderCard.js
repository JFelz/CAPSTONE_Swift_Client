import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { deleteOrder } from '../../api/orderData';

export default function AdminOrderCard({ orderObj }) {
  const deleteCurrentProduct = () => {
    if (window.confirm(`Delete Order #${orderObj.id}?`)) {
      deleteOrder(orderObj.id);
    }
    window.location.reload();
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
        backgroundColor: 'darkred',
        borderRadius: '0px',
      }}
      >
        <Card.Body style={{ marginTop: '5px' }}>
          <Card.Title
            style={{
              minHeight: '15px',
              fontFamily: 'Poppins',
              fontWeight: 'Bold',
              fontSize: '16px',
            }}
          >{orderObj.customerName}
          </Card.Title>
          <Card.Subtitle style={{
            fontFamily: 'Poppins',
            fontWeight: 'normal',
            color: '#979797',
            fontSize: '13px',
          }}
          > {orderObj.customerEmail}
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
            <Card.Text style={{ width: '70px', color: '#7BD45C' }}>Created on: {orderObj.id}</Card.Text>
          </Card.Body>
        </Card.Body>
        <Link href={`/admin/order/${orderObj.id}`} passHref>
          <Button variant="info"> Preview </Button>
        </Link>
        <Link href={`/admin/order/edit/${orderObj.id}`} passHref>
          <Button> Edit </Button>
        </Link>
        <Button variant="danger" onClick={deleteCurrentProduct}> Delete </Button>
      </Card>
    </>
  );
}

AdminOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerUid: PropTypes.string,
  }).isRequired,
};
