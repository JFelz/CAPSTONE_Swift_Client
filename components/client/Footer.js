import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { addNewsletterUser, getNewsletterUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  customerUid: '',
  email: '',
};

export default function FooterPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [newsLetter, setNewsLetter] = useState(initialState);
  const [existingNLUser, setExistingNLUser] = useState();

  const checkNLUser = () => {
    getNewsletterUser(user?.uid).then(setExistingNLUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsLetter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(newsLetter);
  };

  useEffect(() => {
    checkNLUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...newsLetter,
      customerUid: user?.uid,
    };
    if (existingNLUser?.customerUid) {
      addNewsletterUser(payload).then(() => {
        router.push('/').then(setNewsLetter(initialState));
      });
    } else window.alert('You already have a registered email.');
  };

  return (
    <>
      <div className="NewsletterBg">
        <div className="NewsletterField">
          <div className="NewsletterTitle">
            <h1>Join Our Newsletter</h1>
            <p> Sign up for deals, new products and promotions</p>
          </div>
          <div className="InputContainer">
            <div>
              <TextField
                required
                id="normal"
                label="Email"
                name="email"
                value={newsLetter?.email}
                onChange={handleChange}
                variant="standard"
                style={{ width: '15em' }}
              />
            </div>
            <div>
              <Button variant="text" onClick={handleSubmit}> Sign Up </Button>
            </div>
          </div>
        </div>
        <Image
          src="/SwiftNL.svg"
          alt="temp"
          style={{
            height: '18em',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <div />
      </div>
      <footer id="footer">
        <div className="footerTop">
          <Image
            src="/SwiftLogo.svg"
            alt="temp"
            fluid
          />
          <div className="pagelinks">
            <Link href="/" passHref>
              <p>Home</p>
            </Link>
            <Link href="/client/shop/main" passHref>
              <p>Shop</p>
            </Link>
            <Link href="/" passHref>
              <p>About Us</p>
            </Link>
          </div>
        </div>
        <div className="footerBottom">
          <div className="footerBottom_2">
            <p>Privacy Policy</p>
            <p> Terms of Use</p>
          </div>
          <div className="SocialLinks">
            <Link href="https://www.instagram.com/jojointech/" passHref>
              <Button variant="text">
                <InstagramIcon />
              </Button>
            </Link>
            <Link href="https://www.facebook.com/felizjovanni" passHref>
              <Button variant="text">
                <FacebookIcon />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/jfeliz/" passHref>
              <Button variant="text">
                <LinkedInIcon />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
