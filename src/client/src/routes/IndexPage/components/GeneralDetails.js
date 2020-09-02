import React from "react";
import Input from './elements/Input';
import { toSentenceCase } from "../../../resources/methods";
import inputs from '../resources';


const GeneralDetails = ({ updateData }) => {

  const handleChange = (field) => (event) => {
    updateData(field, event.target.value);
  };

  return (
    <div className="div-general">
      <h1>
        General details:
      </h1>
      <Input label="biography" onChange={handleChange("biography")} />
    </div>
  );
};

export default GeneralDetails;
