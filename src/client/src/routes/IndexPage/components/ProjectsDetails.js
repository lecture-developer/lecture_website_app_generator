import React, { useState } from 'react';

const ProjectsDetails = ({ updateData }) => {

  const [details, setDetails] = useState([{
    name: '',
    description: '',
    link: '',
  }]);

  const _handleChange = (field, index) => (event) => {
    const { value } = event.target;

    const newDetails = [ ...details ];
    newDetails[index][field] = value;
    setDetails(newDetails);

    updateData('currentProjects', details);
  }

  const _handleAddRow = () => {
    const newDetails = [ ...details ];
    newDetails.push({ name: '', description: '', link: '' })
    setDetails(newDetails);
  };

  const _handleRemoveRow = (index) => {
    const newDetails = [ ...details ];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  return (
    <div className='projects-container'>
      <h1> Current projects: </h1>
      <button className='btn-add-item' onClick={_handleAddRow}> Add project </button>
      {
        details.map((item, index) => (
          <div className='project-item' key={`${item}-${index}`}>
            <label> Name </label>
            <input type='text' onChange={_handleChange('name', index)} />
            <label> Description </label>
            <input type='text' onChange={_handleChange('description', index)} />
            <label> Link </label>
            <input type='text' onChange={_handleChange('link', index)} />
            <button className='btn-remove-row' onClick={() => _handleRemoveRow(index)}> Delete </button>
          </div>
        ))
      }
    </div>
  );
}

export default ProjectsDetails;
