import React from 'react';
import { toSentenceCase } from '../../../../resources/methods';

const Textarea = ({ label, onChange }) => {
  return (
    <React.Fragment key={label}>
      <label> {toSentenceCase(label)}: </label>
      <textarea name={label} onChange={onChange} />
    </React.Fragment>
  );
};

export default Textarea;
