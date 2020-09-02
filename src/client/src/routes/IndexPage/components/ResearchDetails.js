import React, { useState } from 'react';
import Textarea from './elements/Textarea';
import Input from './elements/Input';

const KEY = 'researchInterests';

const ResearchDetails = ({ updateData }) => {
  const [interests, setInterests] = useState([ " " ]);

  const handleChange = (index) => (event) => {
    const { value } = event.target;
    const updatedInterests = [ ...interests ];

    

    setInterests(updatedInterests);
    updateData(KEY, interests);    
  };

  const handleAddInterest = () => {
    setInterests(prevState => [
      ...prevState,
      " "
    ]);
    // const updatedInterests = [ ...interests ];
    // updatedInterests.push('');
    // setInterests(updatedInterests);
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
        Research details:
      </h1>
      <button onClick={handleAddInterest}> Add research </button>
      <button onClick={handleRemoveInterest}> Remove research </button>
      {
        interests.map((item, index) => (
          <div key={item} className="div-research" style={{border: '2px solid green'}}>
            {/* <Textarea label={`project ${index + 1}`} onChange={handleChange(index)}/> */}
            <Input label={`project ${index + 1}`} onChange={handleChange(index)} />
          </div>
        ))
      }
    </div>
  );
};

export default ResearchDetails;
