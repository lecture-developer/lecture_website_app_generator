import React from "react";
import Input from '../../../components/form/Input';

// A form segment that is focused on all the lecturer's general details
const GeneralDetails = ({ updateData }) => {

  // Every change to an input field - send that data to the main data component (IndexPage)
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
