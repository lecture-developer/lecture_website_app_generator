import React, { useState } from 'react';
import axios from 'axios';

const Display = (props) => {
  const [data, setData] = useState({});

  const _handleChange = (input) => (event) => {
    const { value } = event.target;
    setData(prevData => ({
      ...prevData,
      [input]: value
    }));
  };

  const _handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/index', data );
      console.log(response.config.data);
    } catch(err) {
      console.log('Error sending data to the backend: ', err);
    }
  };

  return (
    <div>
      {/* <form> */}
        <label> Name </label>
        <input type="text" onChange={_handleChange('name')} />
        <br></br>
        <label> Age </label>
        <input type="text" onChange={_handleChange('age')} />
        <br></br>
        <button onClick={_handleSubmit}> Submit </button>
      {/* </form> */}
    </div>
  );
}

export default Display;