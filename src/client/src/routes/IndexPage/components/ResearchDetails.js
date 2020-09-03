import React, { useState } from 'react';
import Textarea from './elements/Textarea';
import Input from './elements/Input';

const KEY = 'researchInterests';

const ResearchDetails = ({ updateData }) => {
  const [interests, setInterests] = useState(
    [
      "Project 1...",
      "Project 2...",
    ]
  );

  const handleChange = (index) => (event) => {
    const { value } = event.target;
    const updatedInterests = [ ...interests ];


    console.log(index);
    console.log('before: ', updatedInterests);
    updatedInterests[index] = value;
    console.log('after: ', updatedInterests);

    setInterests(updatedInterests);
    updateData(KEY, interests);    
  };

  const handleAddInterest = () => {
    setInterests(prevState => [
      ...prevState,
      `Project ${interests.length + 1}...`
    ]);
  };

  const handleRemoveInterest = () => {
    const updatedInterests = [ ...interests ];
    updatedInterests.pop();
    setInterests(updatedInterests);
  };

  // style={{border: '2px solid black'}}

  return (
    <div className="div-projects" style={{border: '2px solid black'}}>
      <h1>
        Research:
      </h1>
      <button onClick={handleAddInterest}> Add research </button>
      <button onClick={handleRemoveInterest}> Remove research </button>
      {
        interests.map((string, index) => (
          <div key={string} className="div-research" style={{border: '2px solid green'}}>
            <label> {`Project ${index+1}`} </label>
            <textarea onChange={handleChange(index)} />
            {/* <Textarea label={`project ${index + 1}`} onChange={handleChange(index)}/> */}
            {/* <Input label={`project ${index + 1}`} onChange={handleChange(index)} /> */}
          </div>
        ))
      }
    </div>
  );
};

export default ResearchDetails;
