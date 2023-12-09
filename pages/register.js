import React from 'react';
import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import RegisterForm from '../components/client/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <section className="FormSplit">
        <section className="FormLeft">
          <div>
            <Image
              src="/swift-register-img.svg"
              fluid
            />
          </div>
        </section>
        <section className="FormRight">
          <div style={{ padding: '20px' }}>
            <h1> Sign Up </h1>
          </div>
          <div className="FormTitle">
            <h6> Already have an account? </h6>
            <br />
            <Link href="/client/shop/main" passHref>
              <h6 style={{ color: 'green' }}> <u> Sign In </u> </h6>
            </Link>
          </div>
          <RegisterForm />
        </section>
      </section>
    </>
  );
}
