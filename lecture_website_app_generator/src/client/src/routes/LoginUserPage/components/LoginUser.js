import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginUser(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangePassword = (e) => {
    // console.log(e);
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    // console.log(e);  
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    console.log(user);

    try {
      const res = await axios.post("http://localhost:5000/users/login", user);
      setEmail(res.data.email);
      setPassword(res.data.password);
      console.log(res.data);

      const { _id: id, name } = res.data;

      // Adding the user's data to the local storage
      sessionStorage.setItem(`user-${res.data._id}`, JSON.stringify({
        id,
        name,
        email
      }));
    } catch (e) {
      console.log("Error " + e.data);
    }
  };
  return (
    <div className="col-md-12">
      <h3>Login: </h3>
      <form onSubmit={onSubmit}>
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
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
      <h4>Or</h4>
      <Link to="/users/register" className="nav-link">
        Sign up
      </Link>
    </div>
  );
}

export default LoginUser;
