import React, { useState } from 'react';

const PublicationsDetails = ({ updateData }) => {

  const [state, setState] = useState({
    name: '',
    description: '',
    link: '',
    type: ''
  });

  const _handleChange = (field) => (event) => {
    const { value } = event.target;
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));

    if (_isAllDataSet()) {
      updateData('featuredPublications', state);
      setState({ name: '', description: '', link: '', type: '' });
    }
  }

  const _isAllDataSet = () => {
    const values = Object.values(state);
    for (const value of values) {
      if (value.length === 0) return false;
    }
    return true;
  };

  return (
    <div>
      <h1> Publications: </h1>
      <label> Name </label>
      <input type='text' onChange={_handleChange('name')} />
      <label> Description </label>
      <input type='text' onChange={_handleChange('description')} />
      <label> Link </label>
      <input type='text' onChange={_handleChange('link')} />
      <label> Type </label>
      <input type='text' onChange={_handleChange('type')} />
    </div>
  )
};

export default PublicationsDetails;
