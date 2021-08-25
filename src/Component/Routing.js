import React from "react";
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import Home from "./Home";
import Login from "./Authentication/Login";
import Timer from "./Timer/Timer";

function Routing() {
  return (
    <div >
          <Switch>
            <Route path="/l" component={Login}  exact />
            <Route path="/" component={Timer}  exact />
          </Switch>
    </div>
  );
}

export default Routing;