import React from "react";
import { capitalize } from "../../routes/IndexPage/resources/methods";

// A form segment that doesn't contain any fields that are dynamic in length 
const StaticFormSegment = ({ title, name, fields, updateMainData }) => {

  // Receives the user data and sends the value to the appropriate component that stores the form values
  const _handleChange = (field) => (event) => {
    updateMainData(field, event.target.value);
  };

  return (
    <div className={`div-${name}`}>
      <h1> {title}: </h1>
      
      {/* 'fields' is an array of strings. For each field, create a label and a text input */}
      {fields.map((field) => (
        <React.Fragment key={field}>
          <label>
            {capitalize(field)}:
          </label>
          <input type="text" onChange={_handleChange(field)} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default StaticFormSegment;
