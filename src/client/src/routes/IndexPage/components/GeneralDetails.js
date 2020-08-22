import React from 'react';
import '../styles/GeneralDetails.css';

const GeneralDetails = ({ updateData }) => {

  const _handleChange = (field) => (event) => {
    updateData(field, event.target.value);
  } 

  return (
    <div className='general-details'>
      <h1> General details: </h1>
      <label> Biography </label>
      <input type='text' onChange={_handleChange('biography')} />
    </div>
  )
};

export default GeneralDetails;
