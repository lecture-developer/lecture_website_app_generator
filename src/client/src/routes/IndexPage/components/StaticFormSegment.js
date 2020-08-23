import React from 'react';
import { capitalize } from '../resources/methods';

const StaticFormSegment = ({ title, name, fields, updateMainData }) => {

  const _handleChange = (field) => (event) => {
    updateMainData(field, event.target.value);
  };

  const className = `div-${name}`;

  return (
    <div className={className}>
      <h1> {title}: </h1>
      {
        fields.map(field => (
          <React.Fragment key={field}>
            <label> {capitalize(field)}: </label>
            <input type='text' onChange={_handleChange(field)} />
          </React.Fragment>
        ))
      }
    </div>
  )
};

export default StaticFormSegment;
