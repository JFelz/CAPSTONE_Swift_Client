const getAllReviews = () => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/reviews', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleReview = (Id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/reviews/${Id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteReview = (id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/reviews/remove/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch('https:localhost:7261/reviews/new', {
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

const updateReview = (id, payload) => new Promise((resolve, error) => {
  fetch(`https:localhost:7261/reviews/update/${id}`, {
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

const getProductReviews = (id) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/products/${id}/reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const addProductReview = (id, payload) => new Promise((resolve, reject) => {
  fetch(`https:localhost:7261/products/${id}/add`, {
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
  getAllReviews,
  addProductReview,
  getSingleReview,
  getProductReviews,
  createReview,
  deleteReview,
  updateReview,
};
