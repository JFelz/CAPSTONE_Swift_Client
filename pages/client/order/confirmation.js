import React, { useEffect, useState } from 'react';
import { getProductsFromOrder, getSingleActiveOrder } from '../../../api/orderData';
import { getCartUserUID } from '../../../api/cartData';
import { useAuth } from '../../../utils/context/authContext';
import ConfirmProductCard from '../../../components/client/ConfirmProductCards';

export default function OrderConfirmationPage() {
  const [activeOrder, setActiveOrder] = useState();
  const [cartData, setCartData] = useState([]);
  const [fullProd, setFullProd] = useState();
  const { user } = useAuth();

  getSingleActiveOrder(user.uid).then(setActiveOrder);

  const getOrderCartData = async () => {
    // Get newly created Order to tag products to
    // This works
    try {
      // Grab the products from cart and add to Order
      await getCartUserUID(user.uid).then(setCartData);
      await console.log('cartData:', cartData);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log('active order:', activeOrder);
  };

  const getProdFromOrd = () => {
    getProductsFromOrder(user.uid).then(setFullProd);
  };

  useEffect(() => {
    getOrderCartData();
    getProdFromOrd();
  }, []);

  return (
    <>
      <div>
        <h1> Purchase Confirmed! </h1>
      </div>
      <div>
        <h3> Order Details </h3>
        <p>{activeOrder?.customerName}</p>
        <p>{activeOrder?.customerEmail}</p>
      </div>
      <div>
        <h4> Purchased Products </h4>
        {fullProd?.map((productObj) => <ConfirmProductCard key={productObj.id} productObj={productObj} />)}
      </div>
    </>
  );
}
