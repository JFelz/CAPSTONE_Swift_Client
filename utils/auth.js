import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7261/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:7261',
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`Request Failed with status: ${response.status}`);
        response.text().then((errorText) => {
          console.error(`Error Message: ${errorText}`);
        });
        reject(new Error('Request Failed'));
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:3000',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
