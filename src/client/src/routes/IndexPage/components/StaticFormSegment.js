import React from 'react';
import { capitalize } from '../resources/methods';

const StaticFormSegment = ({ title, fields, updateMainData }) => {

  const _handleChange = (field) => (event) => {
    updateMainData(field, event.target.value);
  } 

  return (
    <div className='general-details'>
      <h1> {title}: </h1>
      {
        fields.map(name => (
          <React.Fragment key={name}>
            <label> {capitalize(name)}: </label>
            <input type='text' onChange={_handleChange(name)} />
          </React.Fragment>
        ))
      }
    </div>
  )
};

export default StaticFormSegment;
