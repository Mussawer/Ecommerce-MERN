import { API } from "../config";
//user object is being received here

export const createCategory = (userId, token, category) => {
  //it is available with the browser by default
  //We can use Axios as well
  //first argument is url
  //second argument is this object
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //we use json stringify that will convert
    // the object to adjacent string
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createProduct = (userId, token, product) => {
  //it is available with the browser by default
  //We can use Axios as well
  //first argument is url
  //second argument is this object
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    //we use json stringify that will convert
    // the object to adjacent string
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getAllOrders = (userId, token) => {
  return fetch(`${API}/orders/getAll/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/orders/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/orders/${orderId}/status/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, 
    body: JSON.stringify({ status, orerId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
