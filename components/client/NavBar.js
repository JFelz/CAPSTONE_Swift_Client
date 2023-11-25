/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../../utils/auth';

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
            <Link passHref href="/MyProducts">
              <Nav.Link style={{ width: '100px', color: 'black' }}> About Us </Nav.Link>
            </Link>
            <Container style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              width: '40vw',
            }}
            >
              <Link passHref href="/MyLibrary">
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
              <Link passHref href="/MyCart">
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
            <Container style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: 'auto',
            }}
            >
              <Button variant="danger" onClick={signOut}>Sign Out</Button>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
