/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Detail from "Routes/Detail";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Header from "./Header";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/tv' component={TV} />
      <Route path='/search' component={Search} />
      <Route path='/movie/:id' component={Detail} />
      <Route path='/show/:id' component={Detail} />
      <Redirect from='*' to='/' />
    </Switch>
  </Router>
);
