import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUsersUID } from '../api/userData';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState();
  const { user } = useAuth();

  const getUser = () => {
    getUsersUID(user.uid).then(setCurrentUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1> Profile </h1>
    </>
  );
}
