import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth";
const SignIn = () => {
  //need to grab the value as user types in we need to
  //put this value in the state anytime there is change in the state
  //we need to put that value in the state
  //finally user huts the submit button we need to grab all the values
  //stored in state and send it to backend so we cana save the user
  //usestate will be an object
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  //Destructing the values
  const { email, password, loading, error, redirectToReferrer } = values;

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
    setValues({ ...values, error: false, loading: true });
    // we are sening object
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <form>
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
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="SignIn page"
      description="Sign In to Node React Ecommerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default SignIn;
