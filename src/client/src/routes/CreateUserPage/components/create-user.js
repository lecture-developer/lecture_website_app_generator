import React, { Component } from 'react';
import axios from 'axios';

const { useState } = React; 

export default function CreateUser(props) {
  const [username, setUsername] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username
    }

    console.log(user);

    try {
      const res = await axios.post('http://localhost:3000/user/add', user)
      setUsername(res.data.username)
      console.log(res.data)
    }
    catch (e) {
      console.log('Error ' + e.data)
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
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}