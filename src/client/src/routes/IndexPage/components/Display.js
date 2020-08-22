import React, { useState } from 'react';
import axios from 'axios';
import GeneralDetails from './GeneralDetails';
import ProjectsDetails from './ProjectsDetails';
import PublicationsDetails from './PublicationsDetails';

const Display = (props) => {
  const [details, setDetails] = useState({
    biography: '',
    featuredPublications: [],
    currentProjects: [],
  });
  
  const detailsArraysNames = ['featuredPublications', 'currentProjects'];

  const _updateData = (name, data) => {
    // const { data } = event.target;
    // setDetails(prevData => ({
    //   ...prevData,
    //   [input]: data
    // }));
    if (detailsArraysNames.includes(name)) {
      // const arr = [ ...details[name] ];
      const arr = [
        ...details[name],
        data
      ];
      setDetails(prevDetails => ({
        ...prevDetails,
        [name]: [ ...arr ]
      }));
      // setDetails(prevDetails => ({
      //   ...prevDetails,
      //   [name]: [
      //     ...prevDetails[name],
      //     data
      //   ]
      // }));
    } else {
      setDetails(prevDetails => ({
        ...prevDetails,
        [name]: data
      }));
    }
    // console.log(data);
  };

  const _handleSubmit = async () => {
    console.log(details);
    try {
      const response = await axios.post('http://localhost:5000/index', details);
      console.log(response);
    } catch(err) {
      console.log('Error sending data to the backend: ', err);
    }
  };

  return (
    <div className="container">
      {/* <div className="general-details">
        <h1> General details: </h1>
        <label> Biography: </label>
        <input type="text" onChange={_handleChange('biography')} />
      </div>

      <div className="publications-details">
        <h1> Publications: </h1>
      </div>

      <div className="projects-details">
        <h1> Current projects: </h1>
      </div> */}
      <GeneralDetails updateData={_updateData} />
      <PublicationsDetails updateData={_updateData} />
      <ProjectsDetails updateData={_updateData} />
      <button onClick={_handleSubmit}> Submit </button>

      {/* <form> */}
        {/* <label> Name </label>
        <input type="text" onChange={_handleChange('name')} />
        <br></br>
        <label> Age </label>
        <input type="text" onChange={_handleChange('age')} />
        <br></br>
        <button onClick={_handleSubmit}> Submit </button> */}
      {/* </form> */}

    </div>
  );
}

export default Display;
