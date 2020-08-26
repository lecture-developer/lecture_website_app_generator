import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateUser(props) {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onChangeUsername = (e) => {
    console.log(e);
    setUsername(e.target.value);
  }
  const onChangePassword = (e) => {
    console.log(e);
    setPassword(e.target.value);
  }
  const onChangeEmail = (e) => {
    console.log(e);
    setEmail(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: username,
      password: password,
      email: email
    }

    console.log(user);

    try {
      const res = await axios.post('http://localhost:5000/users/register', user);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      console.log(res.data);
    }
    catch (e) {
      console.log('Error ' + e.data);
    }
  }
  return (
      <div className="col-md-12">
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label htmlFor="username">Username </label>
            <input
              required
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
            </div>
          <div className="form-group">
            <label htmlFor="password">Password </label>
            <input  
              type="text"
              className="form-control"
              name="passowrd"
              required
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input  
              required
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="form-group">
            <input 
              type="submit" 
              value="Create User" 
              className="btn btn-primary" />
          </div>
          </form>
          <h4>Or</h4>
          <Link to="/users/login" className="nav-link">Sign In</Link>
        </div>
    );
    };

export default CreateUser;