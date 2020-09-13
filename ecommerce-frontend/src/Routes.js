import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import Home from "./core/Home";


//The main wrapper browser routes will make the props available in these components
//this routes component is returning entire application routes
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
