const getDanceProducts = () => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/products/category/dance', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCruiserProducts = () => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/products/category/cruiser', {
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
  getCruiserProducts,
  getDanceProducts,
};
