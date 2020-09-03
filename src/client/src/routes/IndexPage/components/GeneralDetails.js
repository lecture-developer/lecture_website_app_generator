import React from "react";
import Input from '../../../components/form/Input';


const GeneralDetails = ({ updateData }) => {

  const handleChange = (field) => (event) => {
    updateData(field, event.target.value);
  };

  return (
    <div className="div-general">
      <h1>
        General:
      </h1>
      <Input label="biography" onChange={handleChange("biography")} />
    </div>
  );
};

export default GeneralDetails;
