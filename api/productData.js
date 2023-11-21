const getAllProducts = () => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProducts = (Id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/products/${Id}`, {
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

export {
  getAllProducts,
  getSingleProducts,
  deleteProduct,
};
