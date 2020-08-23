import React, { useState } from 'react';
import { capitalize } from '../resources/methods';

const DynamicFormSegment = ({ title, mainDataKey, fields, updateMainData }) => {
  const obj = {};
  for (const key of fields) obj[key] = '';

  const [values, setValues] = useState([obj]);

  const _handleChange = (field, index) => (event) => {
    const { value } = event.target;
    
    const newValues = [ ...values ];
    newValues[index][field] = value;
    setValues(newValues);

    updateMainData(mainDataKey, values);
  }

  const _handleAddRow = () => {
    const obj = {};
    for (const key of fields) obj[key] = '';

    const newValues = [ ...values ];
    newValues.push(obj)
    setValues(newValues);
  };

  const _handleRemoveRow = (index) => {
    const newValues = [ ...values ];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  return (
    <div className='dynamic-segment-container'>
      <h1> {title}: </h1>
      <button className='btn-add-item' onClick={_handleAddRow}> Add </button>
      {
        values.map((obj, index) => (
          <div className='dynamic-segment-item' key={`${obj}-${index}`}>
            {
              Object.keys(obj).map(name => (
                <React.Fragment key={`${obj}-${name}-${index}`}>
                  <label> {capitalize(name)}: </label>
                  <input type='text' onChange={_handleChange(name, index)} />
                </React.Fragment>
              ))
            }
            <button className='btn-remove-row' onClick={() => _handleRemoveRow(index)}> Delete </button>
          </div>
        ))
      }
    </div>
  );
}

export default DynamicFormSegment;



/*
 fields = {
   Field1: '',
   Field2: '',
   ...
 }
 the names in 'fields' need to start with upper case 
*/