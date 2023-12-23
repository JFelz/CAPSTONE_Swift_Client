import React from 'react';
import { Image } from 'react-bootstrap';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function FooterPage() {
  return (
    <>
      <footer id="footer">
        <div className="footerTop">
          <Image
            src="/SwiftLogo.svg"
            alt="temp"
          />
          <div className="pagelinks">
            <p>Home</p>
            <p>Shop</p>
            <p>About Us</p>
          </div>
        </div>
        <div className="footerBottom">
          <div>
            <p>Privacy Policy</p>
            <p> Terms of Use</p>
          </div>
          <div>
            <InstagramIcon />
            <FacebookIcon />
            <LinkedInIcon />
          </div>
        </div>
      </footer>
    </>
  );
}
