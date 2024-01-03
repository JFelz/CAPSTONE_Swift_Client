import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Carousel, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { returnUserUID } from '../api/userData';

function Home() {
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
            <Carousel className="CarouselHeroImage">
              <Carousel.Item>
                <Image
                  src="/HeroImage.svg"
                  alt="Hero"
                  fluid
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/NewYearNewStyle.svg"
                  alt="Hero"
                  fluid
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/ArborCollective.svg"
                  alt="Hero"
                  fluid
                />
              </Carousel.Item>
            </Carousel>
          </section>
          <section>
            <div className="GridContainer">
              <div className="MainGridLeft">
                <Image
                  src="/SimpleUnique.svg"
                  alt="Hero"
                  height={600}
                />
              </div>
              <div className="MainGridRight">
                <Image
                  src="/UNAGIRIPS.svg"
                  alt="Hero"
                  height={300}
                />
                <Image
                  src="/MainGridImage_1.svg"
                  alt="Hero"
                  height={300}
                />
              </div>
            </div>
          </section>
          <div
            className="text-center d-flex flex-column justify-content-center align-content-center"
            style={{
              height: '90vh',
              padding: '30px',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <h1>Hello, {user.name}! </h1>
            <p> Your Email: {user.email}</p>
            <p>Your Phone Number: {user.phoneNumber}</p>
            <p> Administrator: {user.isAdmin ? 'true' : 'false'}</p>
            <p>Click the button below to logout!</p>
            <Button variant="contained" type="button" size="lg" id="SignOut" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
