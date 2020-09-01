import React from "react";
import { toSentenceCase } from "../../../resources/methods";
import fields from '../resources';

const GeneralDetails = ({ updateData }) => {

  const handleChange = (field) => (event) => {
    updateData(field, event.target.value);
  };

  return (
    <div className="div-general">
      {
        fields.generalFields.map(field => {
          if (field.type === "string") {
            return (
              <React.Fragment key={field.name}>
                <label> { toSentenceCase(field.name) } </label>
                <input name={field.name} type="text" onChange={handleChange(field.name)} />
              </React.Fragment>
            );
          } else return (
            <h1>
              wow
            </h1>
          )
        })
      }
    </div>
  );
};

export default GeneralDetails;
