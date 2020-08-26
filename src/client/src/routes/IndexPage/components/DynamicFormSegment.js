import React, { useState } from "react";
import { capitalize, arrayToObject } from "../resources/methods";

const DynamicFormSegment = ({ title, name, fields, updateMainData }) => {
  // 'fields' is an array of strings
  const [values, setValues] = useState([arrayToObject(fields)]);

  const _handleChange = (field, index) => (event) => {
    const { value } = event.target;

    const newValues = [...values];
    newValues[index][field] = value;
    setValues(newValues);

    updateMainData(name, values);
  };

  const _handleAddRow = () => {
    const newValues = [...values];
    newValues.push(arrayToObject(fields));
    setValues(newValues);
  };

  const _handleRemoveRow = () => {
    const newValues = [...values];
    newValues.pop();
    setValues(newValues);
  };

  const containerClassName = `div-${name}`;
  const rowClassName = `${name}-row`;

  return (
    <div className={containerClassName}>
      <h1> {title}: </h1>
      <button className="btn-add-row" onClick={_handleAddRow}>
        {" "}
        Add row{" "}
      </button>
      {values.map((obj, index) => (
        <div className={rowClassName} key={`${obj}-${index}`}>
          {Object.keys(obj).map((name) => (
            <React.Fragment key={`${obj}-${name}-${index}`}>
              <label> {capitalize(name)}: </label>
              <input type="text" onChange={_handleChange(name, index)} />
            </React.Fragment>
          ))}
        </div>
      ))}
      <button className="btn-remove-row" onClick={_handleRemoveRow}>
        {" "}
        Delete row{" "}
      </button>
    </div>
  );
};

export default DynamicFormSegment;
