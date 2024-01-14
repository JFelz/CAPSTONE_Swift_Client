import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../../utils/context/authContext';
import { returnUserUID } from '../../../api/userData';
import { getAllProducts } from '../../../api/productData';
import ClientProductCard from '../../../components/client/ClientProductCard';

export default function Shop() {
  const { user } = useAuth();
  const router = useRouter();
  const [validCashier, setValidCashier] = useState();
  const [arbor, setArbor] = useState();

  const checkingUser = () => {
    returnUserUID(user.uid).then(setValidCashier);
    console.log('VC', validCashier);
  };

  const getArborProducts = async () => {
    getAllProducts().then(setArbor);
  };

  const pushRoute = () => {
    router.push('/register');
  };

  useEffect(() => {
    checkingUser();
    getArborProducts();
  }, []);
  return (
    <>
      {validCashier === 'Sorry, Customer not found!' ? (
        pushRoute()
      ) : (
        <>
          <section>
            <Image
              src="/swift-shop-herov3.svg"
              alt="Hero"
              loading="lazy"
              fluid
            />
          </section>
          <section>
            <div>
              <Link href="/" passHref>
                <Button> Go Back </Button>
              </Link>
            </div>
            <div className="ArborCollection">
              {arbor?.map((product) => (product.title.includes('ARBOR') || product.title.includes('AXIS') ? <ClientProductCard key={product.id} prodObj={product} onUpdate={getArborProducts} /> : ''))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
