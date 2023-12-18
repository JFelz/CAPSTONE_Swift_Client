import React from 'react';
import { Button } from '@mui/material';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
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
  );
}

export default Home;
