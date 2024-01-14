import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Carousel, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { returnUserUID } from '../api/userData';
import { getAllProducts } from '../api/productData';
import ClientProductCard from '../components/client/ClientProductCard';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [validCashier, setValidCashier] = useState();
  const [newArrivals, setNewArrivals] = useState();

  const checkingUser = () => {
    returnUserUID(user.uid).then(setValidCashier);
    console.log('VC', validCashier);
  };

  const fetchNewArrival = () => {
    getAllProducts().then(setNewArrivals);
  };

  const pushRoute = () => {
    router.push('/register');
  };

  const shopLink = () => {
    router.push('/client/shop/main');
  };

  useEffect(() => {
    checkingUser();
    fetchNewArrival();
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
                  src="/SwiftCollectionBG.svg"
                  alt="Hero"
                  fluid
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/SWITCHBG.svg"
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
                <Link href="/client/shop/12" passHref>
                  <Image
                    src="/ArborSoon.svg"
                    alt="Hero"
                    height={300}
                  />
                </Link>
              </div>
            </div>
          </section>
          <section className="Arrivals-Section">
            <div className="Arrivals-Top-Section">
              <h4>New Arrivals</h4>
              <Button onClick={shopLink}> More Products <KeyboardArrowRightIcon /> </Button>
            </div>
            <div className="Arrivals-Mid-Section">
              {newArrivals?.map((product) => (product.isNewArrival === true ? <ClientProductCard key={product.id} prodObj={product} onUpdate={fetchNewArrival} /> : ''))}
            </div>
            <div className="Arrivals-Bot-Section">
              <Image
                src="/FreeShipping.svg"
                alt="Hero"
                height={200}
              />
              <Image
                src="/MoneyGuarantee.svg"
                alt="Hero"
                height={200}
              />
              <Image
                src="/SecurePayment.svg"
                alt="Hero"
                height={200}
              />
              <Image
                src="/Support.svg"
                alt="Hero"
                height={200}
              />
            </div>
          </section>
          <section className="CollectionSection">
            <div className="CollectionImage">
              <Image
                src="/ArborCollection.svg"
                alt="Hero"
                height={480}
              />
            </div>
            <div className="CollectionAction">
              <section className="CollectionInfo">
                <div>
                  <h1> New Arbor Collection!</h1>
                  <p> Experience the thrill of smooth rides, blazing speed, and undeniable style with Arbors mesmerizing new collection of longboards! </p>
                </div>
                <div>
                  <Link href="/client/shop/arborCollection" passHref>
                    <Button><u>Shop Collection <KeyboardArrowRightIcon /></u></Button>
                  </Link>
                </div>
              </section>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
