import React, { useEffect, useState } from 'react';
import { Image } from '@mui/icons-material';
import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { getUsersUID } from '../../api/userData';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState();
  const { user } = useAuth();

  const getUser = () => {
    getUsersUID(user.uid).then(setCurrentUser);
  };

  console.log(currentUser);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1> Profile </h1>
      <section className="SplitProfile">
        <section className="LeftProfile">
          <Card sx={{ maxWidth: 345, height: '75%' }}>
            <Image
              component="img"
              alt="green iguana"
              height="140"
              width="40"
              image={currentUser?.imageUrl}
              style={{
                borderRadius: '100%',
              }}
            />
            {/* <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              width="40"
              image={currentUser?.imageUrl}
              style={{
                borderRadius: '100%',
              }}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </section>
        <section className="RightProfile"> Right </section>
      </section>
    </>
  );
}
