import React from "react";
import "./App.css";
import Form from "./components/Form";
import Home from "./components/Home";
import Success from "./components/Success";
import { Route, Switch, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  );
};
export default App;
