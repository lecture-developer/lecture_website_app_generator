import React, { useState } from "react";
import axios from "axios";

function SendForgotPasswordEmail(props) {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  
  const onChangeEmail = (e) => {
    console.log(e);
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
    };

    console.log(user);

    try {
      const res = await axios.post("http://localhost:5000/users/send-forgot-password-email", user);
      setResponse(res.data);
    } catch (e) {
      console.log("Error " + e.data);
    }
  };
  return (
    <div className="col-md-12">
      <h3>Forgot password? </h3>
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
          <input type="submit" value="Send reset password link to email" className="btn btn-primary" />
        </div>
        <div>{ response }</div>
      </form>
    </div>
  );
}

export default SendForgotPasswordEmail;
