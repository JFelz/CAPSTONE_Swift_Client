import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CategoryBar from '../../../components/client/FilterBar';
import { useAuth } from '../../../utils/context/authContext';
import { returnUserUID } from '../../../api/userData';

export default function Shop() {
  const { user } = useAuth();
  const router = useRouter();
  const [validCashier, setValidCashier] = useState();

  const checkingUser = () => {
    returnUserUID(user.uid).then(setValidCashier);
    console.log('VC', validCashier);
  };

  const pushRoute = () => {
    router.push('/register');
  };

  useEffect(() => {
    checkingUser();
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
            <CategoryBar />
          </section>
        </>
      )}
    </>
  );
}
