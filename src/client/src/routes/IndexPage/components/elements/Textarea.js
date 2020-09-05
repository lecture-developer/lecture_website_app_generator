import React from 'react';
import { toSentenceCase } from '../../../../resources/methods';

const Textarea = ({ label, onChange }) => {
  return (
    <React.Fragment>
      <label> {toSentenceCase(label)}: </label>
      <textarea name={label} onChange={onChange} rows="5" cols="50" />
    </React.Fragment>
  );
};

export default Textarea;
