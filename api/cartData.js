// eslint-disable-next-line no-unused-vars
const getCartUserUID = (uid) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/cart/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const addToCart = (payload) => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/cart/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      let data;
      if (response.ok) {
        data = await response.text();
        resolve(data);
      }
    })
    .catch(reject);
});

const deleteCartProduct = (uid, id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/cart/${id}/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCartUserUID,
  addToCart,
  deleteCartProduct,
};
