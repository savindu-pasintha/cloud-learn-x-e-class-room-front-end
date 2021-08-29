import React from "react";
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import Home from "./Home";
import Login from "./Authentication/Login";
import Acc from "./Authentication/AccountCreate";
import Timer from "./Timer/Timer";
import T from "./Timer/T";

function Routing() {
  return (
    <div >
          <Switch>
            <Route path="/" component={Login}  exact />
            <Route path="/t" component={Timer}  exact />
            <Route path="/tc" component={T}  exact />
            <Route path="/acc" component={Acc}  exact />
          </Switch>
    </div>
  );
}

export default Routing;
