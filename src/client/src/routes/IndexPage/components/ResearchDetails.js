import React, { useState } from 'react';
import Textarea from './elements/Textarea';

const DATA_KEY = 'researchInterests';

const ResearchDetails = ({ updateData }) => {
  const [interests, setInterests] = useState(
    [
      "",
    ]
  );

  const handleChange = (index) => (event) => {
    // Get the current values
    const { value } = event.target;
    const updatedInterests = [ ...interests ];

    // Update the interest string
    updatedInterests[index] = value;

    // Update the local state and send the updated values to the main data component
    setInterests(updatedInterests);
    updateData(DATA_KEY, interests);
  };

  const handleAddInterest = () => {
    setInterests(prevState => [
      ...prevState,
      ""
    ]);
  };

  const handleRemoveInterest = () => {
    const updatedInterests = [ ...interests ];
    updatedInterests.pop();
    setInterests(updatedInterests);
  };

  return (
    <div className="div-projects">
      <h1>
        Research:
      </h1>
      <button onClick={handleAddInterest}> Add research </button>
      <button onClick={handleRemoveInterest}> Remove research </button>
      {
        interests.map((string, index) => (
          <div key={index} className="div-research">
            <Textarea label={`project ${index + 1}`} onChange={handleChange(index)}/>
          </div>
        ))
      }
    </div>
  );
};

export default ResearchDetails;
