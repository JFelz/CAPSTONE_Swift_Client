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

export {
  createOrder,
  getSingleOrder,
};
