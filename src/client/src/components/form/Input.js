import React from 'react';
import { toSentenceCase } from '../../resources/methods';

const Input = ({ label, onChange }) => {
  return (
    <React.Fragment key={label}>
      <label> {toSentenceCase(label)}: </label>
      <input type="text" name={label} onChange={onChange} />
    </React.Fragment>
  );
};

export default Input;
