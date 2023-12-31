/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Image,
} from 'react-bootstrap';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="#242424" variant="dark" className="NavBar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand style={{ color: '#35CEB3' }}>
            <Image
              src="/SwiftLogo.svg"
              width={135}
              height={40}
              alt="Swift"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '15px',
            }}
          >
            <Link passHref href="/">
              <Nav.Link style={{ color: 'black' }}>Home</Nav.Link>
            </Link>
            <Link passHref href="/client/shop/main">
              <Nav.Link style={{ color: 'black' }}>Shop</Nav.Link>
            </Link>
            <Container style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              width: '50vw',
            }}
            >
              <Link passHref href="/client/cart/view">
                <Nav.Link style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px',
                  width: '40px',
                  marginRight: '10px',
                  color: 'black',
                }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 25 }} />
                </Nav.Link>
              </Link>
              <Link passHref href="/client/profile">
                <Nav.Link style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px',
                  width: '40px',
                  color: 'black',
                }}
                >
                  <AccountCircleIcon sx={{ fontSize: 25 }} />
                </Nav.Link>
              </Link>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
