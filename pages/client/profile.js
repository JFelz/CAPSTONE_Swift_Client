import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';
import { getUsersUID } from '../../api/userData';
import { getUserAllOrder } from '../../api/orderData';
import ClientOrderCard from '../../components/client/ClientOrderCard';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState();
  const [currentView, setCurrentView] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const { user } = useAuth();

  const getUser = () => {
    getUsersUID(user.uid).then(setCurrentUser);
  };

  const getOrder = () => getUserAllOrder(user.uid).then(setCurrentOrder);

  console.log(currentOrder);

  const setAccount = () => setCurrentView('account');

  const setOrder = () => setCurrentView('order');

  console.log(currentUser);

  useEffect(() => {
    getUser();
    getOrder();
  }, []);

  return (
    <>
      <h1> Profile </h1>
      <section className="SplitProfile">
        <section className="LeftProfile">
          <Card sx={{
            width: '100%', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '2em',
          }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={currentUser?.imageUrl}
              style={{
                borderRadius: '100%',
                height: '100px',
                width: '100px',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {currentUser?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser?.bio}
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
              <Button size="small" variant="text" onClick={setAccount}>Account Details</Button>
              <Button size="small" variant="text" onClick={setOrder}>Order History</Button>
              <Button variant="danger" style={{ color: 'red' }} onClick={signOut}>Log Out</Button>
            </CardActions>
          </Card>
        </section>
        <section className="RightProfile">
          <h1> Order History </h1>
          { currentView === 'account' ? (
            <>
              <p>{currentUser?.name}</p>
              <p>{currentUser?.email}</p>
              <p>{currentUser?.phoneNumber}</p>
              <p>{currentUser?.bio}</p>
            </>
          ) : ('') }
          { currentView === 'order' ? (
            <>
              {currentOrder?.map((order) => <ClientOrderCard key={order.id} orderObj={order} />)}
            </>
          ) : ('') }
        </section>
      </section>
    </>
  );
}
