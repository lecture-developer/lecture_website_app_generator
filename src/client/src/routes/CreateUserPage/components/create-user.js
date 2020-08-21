import React, { Component } from 'react';
import axios from 'axios';

const { useState } = React; 

export default function CreateUser(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: username,
      email: email,
      password: password
    }

    console.log(user);

    try {
      const res = await axios.post('http://localhost:3000/register', user);
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
      <div>
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={onChangeUsername}
                />
            <br/>
            <br/>
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={onChangePassword}
                />
            <br/>
            <br/>
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={onChangeEmail}
                />
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}