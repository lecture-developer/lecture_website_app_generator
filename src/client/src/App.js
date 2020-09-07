import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./routes/navbar";
import CreateUser from "./routes/CreateUserPage/components/CreateUser";
import LoginUser from "./routes/LoginUserPage/components/LoginUser";
import ActivateUser from "./routes/ActivateUserPage/components/ActivateUser";
import SendForgotPasswordEmail from "./routes/SendForgotPasswordEmailPage/components/SendForgotPasswordEmail";
import ForgotPassword from "./routes/ForgotPasswordPage/components/ForgotPasswordPage";
import IndexPage from "./routes/IndexPage/components/IndexPage";
import PublicationsPage from "./routes/PublicationsPage/components/PublicationsPage";

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
          <Route path="/users/send-forgot-password-email" component={SendForgotPasswordEmail} />
          <Route path="/users/change-password" component={ForgotPassword} />
          <Route path="/index" component={IndexPage} />
          <Route path="/publications" component={PublicationsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
