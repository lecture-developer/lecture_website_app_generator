import React, { useState } from "react";
import axios from "axios";

function ForgotPassword(props) {
  const [newPassword, setNewPassowrd] = useState("");
  const [response, setResponse] = useState("");
  

  const onChangePassword = (e) => {
    console.log(e);
    setNewPassowrd(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const pathname = props.location.pathname;
    const segmentArray = pathname.split("/");
    const lastSegment = segmentArray.pop();
    const data = {
      token: lastSegment,
      newPassword: newPassword
    };

    try {
        console.log(data.token);
      const res = await axios.post("http://localhost:5000/users/change-password", data);
      setResponse(res.data);
    } catch (e) {
      console.log("Error " + e.data);
    }
  };
  return (
    <div className="col-md-12">
      <h3>Create new password </h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Password </label>
          <input
            required
            type="text"
            className="form-control"
            name="newPassword"
            value={newPassword}
            onChange={onChangePassword}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
        <div>{ response }</div>
      </form>
    </div>
  );
}

export default ForgotPassword;
