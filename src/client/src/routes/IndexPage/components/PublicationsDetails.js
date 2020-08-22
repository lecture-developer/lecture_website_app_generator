import React, { useState } from 'react';

const PublicationsDetails = ({ updateData }) => {

  const [details, setDetails] = useState([{
    name: '',
    description: '',
    link: '',
    type: '',
  }]);

  const _handleChange = (field, index) => (event) => {
    const { value } = event.target;

    const newDetails = [ ...details ];
    newDetails[index][field] = value;
    setDetails(newDetails);

    updateData('featuredPublications', details);
  }

  const _handleAddRow = () => {
    const newDetails = [ ...details ];
    newDetails.push({ name: '', description: '', link: '', type: '' })
    setDetails(newDetails);
  };

  const _handleRemoveRow = (index) => {
    const newDetails = [ ...details ];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  return (
    <div className='publications-container'>
      <h1> Publications: </h1>
      <button className='btn-add-item' onClick={_handleAddRow}> Add publication </button>
      {
        details.map((item, index) => (
          <div className='publication-item' key={`${item}-${index}`}>
            <label> Name </label>
            <input type='text' onChange={_handleChange('name', index)} />
            <label> Description </label>
            <input type='text' onChange={_handleChange('description', index)} />
            <label> Link </label>
            <input type='text' onChange={_handleChange('link', index)} />
            <label> Type </label>
            <input type='text' onChange={_handleChange('type', index)} />
            <button className='btn-remove-row' onClick={() => _handleRemoveRow(index)}> Delete </button>
          </div>
        ))
      }
    </div>
  );
}

export default PublicationsDetails;
