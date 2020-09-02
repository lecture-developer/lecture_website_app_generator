import React, { useState } from 'react';
import axios from 'axios';
import GeneralDetails from './GeneralDetails';
import ResearchDetails from './ResearchDetails';
import PublicationsDetails from './PublicationsDetails';
import ProjectsDetails from './ProjectsDetails';

import '../styles/IndexPage.css';

const IndexPage = () => {

  const [formValues, setFormValues] = useState({});

  const updateData = (key, data) => {
    setFormValues(prevState => ({
      ...prevState,
      [key]: data
    }))
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/index", formValues);
      console.log(response);
    } catch (err) {
      console.log("Error sending data to the backend: ", err);
    }
  };

  return (
    // <form>
    <div>
      <div className="container">
        <GeneralDetails updateData={updateData}/>
        <ResearchDetails updateData={updateData}/>
        {/* <PublicationsDetails updateData={updateData}/> */}
        <ProjectsDetails updateData={updateData}/>
      </div>
      <button id="submit" onClick={handleSubmit}>
        Submit
      </button>
      </div>
    // </form>
  );
};

export default IndexPage;
