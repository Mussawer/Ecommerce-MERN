import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeToken,
  processPayment,
  createOrder,
} from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { emptyCart } from "./cartHelpers";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

//we need to get productst from the cart to calculate total
//so that means we need products as props
const Checkout = ({ products, createOrder }) => {
  //state to store token
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  //this method will run when the component mounts and when there is
  //change in the state
  const getToken = (userId, token) => {
    getBraintreeToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  //getToken from backend
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const showCheckout = () => {
    {
      return isAuthenticated() ? (
        <div>{showDropIn()}</div>
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary">Sign In to Checkout</button>
        </Link>
      );
    }
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        //once you have nonce (cart type, card nummber) send nonce as 'paymentMthodNonce'
        //and also total to be charged
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            const createOrderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData).then((response) => {
              emptyCart(() => {
                setData({ loading: false, success: true });
              });
            });
          })
          .catch((error) => {
            setData({ loading: false });
          });
      })
      .catch((error) => {
        setData({ loading: false });
      });
  };

  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Delivery Address: </label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here"
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onCLick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your Payment is Successful!
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
