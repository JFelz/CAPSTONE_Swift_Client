const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7261/orders/new', {
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

const getSingleOrder = (Id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/orders/${Id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleActiveOrder = (UID) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/orders/${UID}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getProductsFromOrder = (UID) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/orders/${UID}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const addProductToOrder = (UID, payload) => new Promise((resolve, reject) => {
  console.log('Adding product to order:', UID, payload);
  fetch(`https://localhost:7261/orders/${UID}/products/list/${payload}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log('Response from server:', data);
      resolve(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
});

export {
  createOrder,
  getSingleOrder,
  getSingleActiveOrder,
  addProductToOrder,
  getProductsFromOrder,
};
