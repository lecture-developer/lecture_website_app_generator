import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './routes/navbar';
import CreateUser from './routes/CreateUserPage/components/create-user';
import LoginUser from './routes/LoginUserPage/components/login-user';
import ActivateUser from './routes/ActivateUserPage/components/activate-user'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path = "/users/register" component={CreateUser} />
      <Route path = "/users/login" component={LoginUser}/>
      <Route path = "/users/activation" component={ActivateUser}/>
      </div>
    </Router>
  );
}

export default App;