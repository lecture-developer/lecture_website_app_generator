import React, { useState } from "react";
import { toSentenceCase } from "../../../resources/methods";
import inputs from '../resources';

const ProjectsDetails = ({ updateData }) => {

  const [values, setValues] = useState({});

  const handleChange = (field) => (event) => {
    updateData(field, event.target.value);
  };

  return (
    <div className="div-projects">
      {
        inputs.projectsInputs.map(input => {
          switch (input.type) {

            case "string": return (
              <React.Fragment key={input.name}>
                <label> {toSentenceCase(input.name)} </label>
                <input name={input.name} type="text" onChange={handleChange(input.name)} />
              </React.Fragment>
            );

            case "array": return (
              <div key={input.name}>
                zibi
              </div>
            );

            case "object": return (
              <div key={input.name}>
                {
                  input.fields.map(field => (
                    <React.Fragment key={field.name}>
                      <label> {toSentenceCase(field.name)} </label>
                      <input name={field.name} type="text" onChange={handleChange(field.name)} />
                    </React.Fragment>
                  ))
                }
              </div>
            )

            default:
              return null;
          }
        })
      }    
    </div>
  );
};

export default ProjectsDetails;
