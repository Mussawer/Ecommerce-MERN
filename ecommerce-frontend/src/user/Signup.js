import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
const SignUp = () => {
  //need to grab the value as user types in we need to
  //put this value in the state anytime there is change in the state
  //we need to put that value in the state
  //finally user huts the submit button we need to grab all the values
  //stored in state and send it to backend so we cana save the user
  //usestate will be an object
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "", 
    error: "",
    success: false,
  });

  //Destructing the values
  const { name, email, password, success, error } = values;

  //method to grab the change in the values
  //this will be a higherOrder function a function returning another function
  //anytime there is change event is fired and we grab the change in event target value
  //[name] will be dynamic this can be in this case name, email or password anyfield where value is changed
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    //to prevent the page load when the button is clicked
    event.preventDefault();
    setValues({ ...values, error: false });
    // we are sening object
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => {
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("passwor")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>;
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New Account is created. Please <Link to="/signin">SignIn</Link>
    </div>
  );

  return (
    <Layout
      title="SignUp page"
      description="Sign up to Node React Ecommerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default SignUp;
