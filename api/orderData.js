const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7261/orders/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      let data;
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
          console.log('Response Data:', data);
        } else {
        // Handle non-JSON responses, e.g., plain text errors
          data = await response.text();
        }
        resolve(data);
      }
    })
    .catch((error) => {
      console.error('Error Response:', error);
      reject(error);
    });
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

const getProductsFromOrder = (Id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7261/orders/${Id}/products`, {
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
    .then(async (response) => {
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      let data;
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
          console.log('Response Data:', data);
        } else {
          // Handle non-JSON responses, e.g., plain text errors
          data = await response.text();
        }
        resolve(data);
      }
    })
    .catch((error) => {
      console.error('Error Response:', error);
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
        data = await response.json();
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
