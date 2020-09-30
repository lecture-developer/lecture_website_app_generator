import React, { useState } from 'react';
import axios from 'axios';
import GeneralDetails from './GeneralDetails';
import ResearchDetails from './ResearchDetails';
import PublicationsDetails from './PublicationsDetails';
import ProjectsDetails from './ProjectsDetails';

import '../styles/IndexPage.css';

const IndexPage = (props) => {
  // const { userId } = props;
  const userId = '123456789';
  
  const [formValues, setFormValues] = useState({});

  const updateData = (key, data) => {
    setFormValues(prevState => ({
      ...prevState,
      [key]: data
    }))
  };

  // Sending the input to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/index", { userId, data: formValues });
      console.log(response);
    } catch (err) {
      console.log("Error sending data to the backend: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <GeneralDetails updateData={updateData}/>
        <ResearchDetails updateData={updateData}/>
        <PublicationsDetails updateData={updateData} userId={userId}/>
        <ProjectsDetails updateData={updateData}/>
      </div>
      <input type="submit" className="btn btn-primary" value="Submit" />
   </form>
  );
};

export default IndexPage;
