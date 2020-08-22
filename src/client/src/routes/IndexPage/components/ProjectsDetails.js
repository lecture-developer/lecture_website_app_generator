import React, { useState } from 'react';

const ProjectsDetails = ({ updateData }) => {

  const [state, setState] = useState({
    name: '',
    description: '',
    link: '',
  });

  const _handleChange = (field) => (event) => {
    const { value } = event.target;
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));

    if (_isAllDataValid()) {
      updateData('currentProjects', state);
      setState({ name: '', description: '', link: '' });
    }
  };

  const _isAllDataValid = () => {
    const values = Object.values(state);
    for (const value of values) {
      if (value.length === 0) return false;
    }
    return true;
  };

  return (
    <div>
      <h1> Current projects: </h1>
      <label> Name </label>
      <input type='text' onChange={_handleChange('name')} />
      <label> Description </label>
      <input type='text' onChange={_handleChange('description')} />
      <label> Link </label>
      <input type='text' onChange={_handleChange('link')} />
    </div>
  )
};

export default ProjectsDetails;
