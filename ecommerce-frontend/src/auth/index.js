import { API } from "../config";
//user object is being received here
export const signup = (user) => {
  //console.log(name, email, password);
  //it is available with the browser by default
  //We can use Axios as well
  //first argument is url
  //second argument is this object
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //we use json stringify that will convert
    // the object to adjacent string
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signin = (user) => {
  //console.log(name, email, password);
  //it is available with the browser by default
  //We can use Axios as well
  //first argument is url
  //second argument is this object
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //we use json stringify that will convert
    // the object to adjacent string
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

//method to store token in local storage
//local storage is the object of window
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    //setitem takes forst argument as key
    //and secon argument data to associate with that key
    localStorage.setItem("jwt", JSON.stringify(data));
    //it is callback
    next();
  }
};

//remove the token from local storage and
//make a request to bakend to get logged out
//also redirect the user to some certain page
//we will do this all in this callback: next
export const signout = (next) => {
  if (typeof window !== "undefined") {
    //setitem takes forst argument as key
    //and secon argument data to associate with that key
    localStorage.removeItem("jwt");
    //it is callback
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("sognout", response);
      })
      .catch((error) => console.log(error));
  }
};

//return user if user is authenticated
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    //to read and return json format we use json.parse method
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
