/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../../utils/auth';

export default function AdminNavBarAuth() {
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
              <Nav.Link style={{ color: 'black', width: '100px' }}>Dashboard</Nav.Link>
            </Link>
            <Link passHref href="/admin/product/main">
              <Nav.Link style={{ color: 'black', width: '100px' }}>Products</Nav.Link>
            </Link>
            <Link passHref href="/admin/order/main">
              <Nav.Link style={{ color: 'black', width: '100px' }}>Orders</Nav.Link>
            </Link>
            <Link passHref href="/MyProducts">
              <Nav.Link style={{ color: 'black', width: '100px' }}>Customers</Nav.Link>
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
                  width: '120px',
                  marginRight: '10px',
                }}
                >
                  <Image
                    src="/LibraryIcon.png"
                    width={20}
                    style={{ marginRight: '5px' }}
                  />
                  My Library
                </Nav.Link>
              </Link>
              <Link passHref href="/MyCart">
                <Nav.Link style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px',
                  width: '62px',
                }}
                >
                  <Image
                    src="/CartIcon.png"
                    width={25}
                    style={{ marginRight: '5px' }}
                  />
                  Cart
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
