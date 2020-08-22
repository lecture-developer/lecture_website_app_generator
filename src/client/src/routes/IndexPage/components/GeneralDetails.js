import React from 'react';

const GeneralDetails = ({ updateData }) => {

  const _handleChange = (field) => (event) => {
    updateData(field, event.target.value);
  } 

  return (
    <div>
      <h1> General details: </h1>
      <label> Name </label>
      <input type='text' onChange={_handleChange('name')} />
      <label> Age </label>
      <input type='text' onChange={_handleChange('age')} />
      <label> Biography </label>
      <input type='text' onChange={_handleChange('biography')} />
    </div>
  )
};

export default GeneralDetails;
