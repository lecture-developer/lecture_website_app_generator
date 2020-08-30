import React, { useState } from "react";
import { capitalize, arrayToObject } from "../../../resources/methods";

// A form segment that contains fields that are dynamic in lengths (multiple number of projcets, publications etc.)
const DynamicFormSegment = ({ title, name, fields, updateMainData }) => {
  // 'fields' is an array of strings
  const [values, setValues] = useState([arrayToObject(fields)]);

  // Receives input, updates the local state and sends the updated state to the main component
  const _handleChange = (field, index) => (event) => {
    const { value } = event.target;

    const newValues = [...values];
    newValues[index][field] = value;
    setValues(newValues);

    updateMainData(name, values);
  };

  // Adding another object to the state of values - increasing the number of rows to render
  const _handleAddRow = () => {
    const newValues = [...values];
    newValues.push(arrayToObject(fields));
    setValues(newValues);
  };

  // Removing an object from the state of values - decreasing the number of rows to render
  const _handleRemoveRow = () => {
    const newValues = [...values];
    newValues.pop();
    setValues(newValues);
  };

  return (
    <div className={`div-${name}`}>
      <h1>
        {title}:
      </h1>
      <button className="btn-add-row" onClick={_handleAddRow}>
        Add row
      </button>

      {/* Iterating over all the objects in the local state */}
      {values.map((obj, index) => (
        <div className={`${name}-row`} key={`${obj}-${index}`}>

          {/* Each object contains different number of fields. Render a label and a text input for each field. */}
          {Object.keys(obj).map((name) => (
            <React.Fragment key={`${obj}-${name}-${index}`}>
              <label>
                {capitalize(name)}:  
              </label>
              <input type="text" onChange={_handleChange(name, index)} />
            </React.Fragment>
          ))}
        </div>
      ))}
      <button className="btn-remove-row" onClick={_handleRemoveRow}>
        Delete row
      </button>
    </div>
  );
};

export default DynamicFormSegment;
