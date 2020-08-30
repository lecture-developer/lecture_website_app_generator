import React, { useState } from "react";
import axios from "axios";
import { staticFields } from "../resources/fields";
import { capitalize, arrayToObject } from "../../../resources/methods";

const PublicationsPage = (props) => {
  const [formValues, setFormValues] = useState(
    [
      {
        ...arrayToObject(staticFields),
        fileLinks: [{ }]
      },
    ]
  );

  const handleChangeStaticField = (field, publicationIndex) => (event) => {
    const { value } = event.target;

    // Get the original publication data object and update it
    const newValues = [ ...formValues ];
    const publicationItem = {
      ...newValues.splice(publicationIndex, 1)[0],
      [field]: value
    };
    // Add it back to the array of publications data objects
    newValues.splice(publicationIndex, 0, publicationItem);

    // Update the state
    setFormValues(newValues);
  };

  const handleChangeDynamicField = (field, publicationIndex, fileLinkIndex) => (event) => {
    const { value } = event.target;

    // Get the original publication item from the array of publication data objects
    const newValues = [ ...formValues ];
    const publicationItem = { ...newValues.splice(publicationIndex, 1)[0] };
    
    // Update the file link item
    const fileLinkItem = {
      ...publicationItem.fileLinks.splice(fileLinkIndex, 1)[0],
      [field]: value
    };

    // Update the publication data object
    publicationItem.fileLinks.splice(fileLinkIndex, 0, fileLinkItem);

    // Update the array
    newValues.splice(publicationIndex, 0, publicationItem);

    // Update the state
    setFormValues(newValues);
  };

  const handleAddPublication = () => {
    const values = [ ...formValues ];
    values.push(
      {
        ...arrayToObject(staticFields),
        fileLinks: [{ }]
      }
    );
    setFormValues(values);
  };

  const handleRemovePublication = () => {
    const values = [ ...formValues ];
    values.pop();
    setFormValues(values);
  };


  const handleAddFileLink = (itemIndex) => {
    // Remove the original object from the array at the specified index
    const values = [ ...formValues ];
    const publicationItem = { ...values.splice(itemIndex, 1)[0] };

    // Add a new file link object
    publicationItem.fileLinks.push({ });

    // Add it back to the array
    values.splice(itemIndex, 0, publicationItem);

    // // Update the state
    setFormValues(values);
  };

  const handleRemoveFileLink = (itemIndex) => {
    // Remove the original object from the array
    const values = [ ...formValues ];
    const publicationItem = { ...values.splice(itemIndex, 1)[0] };

    // Remove a file link object
    publicationItem.fileLinks.pop();

    // Add it back to the array
    values.splice(itemIndex, 0, publicationItem);

    // Update the state
    setFormValues(values);
  };  

  // Sends the values entered by the user to the backend to generate the appropriate .json file
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/publications", formValues);
      console.log(response);
    } catch (err) {
      console.log("Error sending data to the backend: ", err);
    }
  };

  return (
    // <form>
      <div className="div-publications-container">
        {
          // Iterating over the current number of publications
          formValues.map((publicationItem, publicationIndex) => (
            <div className="div-publication-item">
              {
                // For each publication, iterating over the static fields and for each one rendering a label and a text input
                staticFields.map(field => (
                  <React.Fragment key={`${publicationItem}-${field}`}>
                    <label> {capitalize(field)} </label>
                    <input type="text" onChange={handleChangeStaticField(field, publicationIndex)} />
                  </React.Fragment>
                ))
              }
              <button onClick={handleAddFileLink}> Add file </button>
              {
                // For each publication, iterating over the file links fields
                formValues[publicationIndex].fileLinks.map((fileLinkItem, fileLinkIndex) => (
                  <React.Fragment>
                    <label> Info </label>
                    <input type="text" onChange={handleChangeDynamicField("info", publicationIndex, fileLinkIndex)} />
                    <label> Type </label>
                    <input type="text" onChange={handleChangeDynamicField("type", publicationIndex, fileLinkIndex)} />
                    <label> Type </label>
                    <input type="text" onChange={handleChangeDynamicField("link", publicationIndex, fileLinkIndex)} />
                  </React.Fragment>
                ))
              }
              <button onClick={handleRemoveFileLink}> Remove file </button>
            </div>
          ))
        }
        <button onClick={handleAddPublication}> Add publication </button>
        <button onClick={handleRemovePublication}> Remove publication </button>
        <button type="submit" onClick={handleSubmit}> Submit </button>
      </div>
  );
};

export default PublicationsPage;
