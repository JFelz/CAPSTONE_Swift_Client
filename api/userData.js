// const getUsersUID = (uid) => new Promise((resolve, reject) => {
//   fetch(`https:localhost:7261/checkuser/auth/${uid}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.text())
//     .then(resolve)
//     .catch(reject);
// });

const getSingleUser = (Id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/users/byIden/${Id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/products/remove/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const registerNewUser = (payload) => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  registerNewUser,
  getSingleUser,
  deleteProduct,
};
