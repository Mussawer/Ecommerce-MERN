import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

//we need to get productst from the cart to calculate total
//so that means we need products as props
const Checkout = ({ products }) => {
  const showCheckout = () => {
    {
      return isAuthenticated() ? (
        <button className="btn btn-success">Checkout</button>
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
  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
