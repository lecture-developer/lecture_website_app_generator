import React, { useState } from 'react';
import axios from 'axios';
import GeneralDetails from './GeneralDetails';
import ProjectsDetails from './ProjectsDetails';
import PublicationsDetails from './PublicationsDetails';
import '../styles/Display.css';

const Display = (props) => {
  const [formValues, setFormValues] = useState({
    biography: '',
    featuredPublications: [],
    currentProjects: [],
  });
  
  // const detailsArraysNames = ['featuredPublications', 'currentProjects'];

  const _updateData = (name, data) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: data
    }));
  };

  const _handleSubmit = async () => {
    console.log(formValues);
    try {
      const response = await axios.post('http://localhost:5000/index', formValues);
      console.log(response);
    } catch(err) {
      console.log('Error sending data to the backend: ', err);
    }
  };

  return (
    // <form>
      <div className='container'>
        <GeneralDetails updateData={_updateData} />
        <PublicationsDetails updateData={_updateData} />
        <ProjectsDetails updateData={_updateData} />
        <button id='submit' onClick={_handleSubmit}> Submit </button>
      </div>
    // </form>
  );
}

export default Display;
