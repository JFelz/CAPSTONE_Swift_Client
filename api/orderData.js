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

const getAllOrders = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7261/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (Id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7261/orders/${Id}`, {
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
  fetch(`https://localhost:7261/orders/${UID}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserAllOrder = (UID) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7261/orders/all/${UID}`, {
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
  fetch(`https://localhost:7261/orders/${UID}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const addProductToOrder = (UID) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7261/orders/${UID}/productslist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from server:', data);
      resolve(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
});

const deleteOrder = (Id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7261/orders/remove/${Id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (id, payload) => new Promise((resolve, error) => {
  fetch(`https://localhost:7261/orders/update/${id}`, {
    method: 'PUT',
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
    .catch(error.message);
});

export {
  createOrder,
  getUserAllOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getSingleActiveOrder,
  addProductToOrder,
  getProductsFromOrder,
};
