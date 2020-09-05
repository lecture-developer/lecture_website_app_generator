import React, { useState } from 'react';
import Input from './elements/Input';

const DATA_KEY = 'currentProjects';

const ProjectsDetails = ({ updateData }) => {
  const [projects, setProjects] = useState(
    [
      {
        name: '',
        description: '',
        link: {
          info: '',
          type: '',
          link: '',
        },
      },
    ]
  );

  // 'field' can either be a one word string or a dot-separated string (e.g link.type)
  const handleChange = (field, index) => (event) => {
    // Get the current values
    const { value } = event.target;
    const updatedProjects = [ ...projects ];

    // Split the field input to check if it's a dot-separated string or not
    const [outerField, innerField] = field.split(".");

    // If there isn't inner field then it's either 'name' or 'description'
    if (!innerField) {
      updatedProjects[index] = {
        ...updatedProjects[index],
        [outerField]: value
      };

      // Otherwise, we update the 'link' object
    } else {
      updatedProjects[index][outerField] = {
        ...updatedProjects[index][outerField],
        [innerField]: value
      };
    }

    // Set the current state to the updated state and send the data to the main data component
    setProjects(updatedProjects);
    updateData(DATA_KEY, projects);
  };

  const handleAddProject = () => {
    const updatedProjects = [ ...projects ];
    updatedProjects.push({ });
    setProjects(updatedProjects);
  };

  const handleRemoveProject = () => {
    const updatedProjects = [ ...projects ];
    updatedProjects.pop();
    setProjects(updatedProjects);
  };

  return (
    <div className="div-projects">
      <h1>
        Projects:
      </h1>
      <button onClick={handleAddProject}> Add project </button>
      <button onClick={handleRemoveProject}> Remove project </button>
      {
        projects.map((project, index) => (

          <div key={`${project}-${index}`} className="div-project">
            <Input label="name" onChange={handleChange("name", index)} />
            <Input label="description" onChange={handleChange("description", index)} />

            <div className="div-project-link">
              <Input label="info" onChange={handleChange("link.info", index)} />
              <Input label="type" onChange={handleChange("link.type", index)} />
              <Input label="link" onChange={handleChange("link.link", index)} />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ProjectsDetails;
