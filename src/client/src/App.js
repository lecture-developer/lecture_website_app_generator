import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./routes/navbar";
import CreateUser from "./routes/CreateUserPage/components/CreateUser";
import LoginUser from "./routes/LoginUserPage/components/LoginUser";
import ActivateUser from "./routes/ActivateUserPage/components/ActivateUser";
import Display from "./routes/IndexPage/components/Display";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Switch>
          <Route path="/users/register" component={CreateUser} />
          <Route path="/users/login" component={LoginUser} />
          <Route path="/users/activation" component={ActivateUser} />
          <Route path="/index" component={Display} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
