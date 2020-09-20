import React, { useState } from "react";
import axios from "axios";
import { staticFields } from "../resources/fields";
import { arrayToObject } from "../../../resources/methods";
import Input from '../../../components/form/Input';

const PublicationsPage = (props) => {
  // const { userId } = props;
  const userId = '123456789';
  const [publications, setPublications] = useState(
    [
      {
        ...arrayToObject(staticFields),
        fileLinks: [
          {
            info: '',
            type: '',
            link: ''
          }
        ]
      },
    ]
  );

  const handleChangeStaticField = (field, publicationIndex) => (event) => {
    const { value } = event.target;

    // Get the original publication data object and update it
    const newValues = [ ...publications ];
    const publicationItem = {
      ...newValues.splice(publicationIndex, 1)[0],
      [field]: value
    };
    // Add it back to the array of publications data objects
    newValues.splice(publicationIndex, 0, publicationItem);

    // Update the state
    setPublications(newValues);
  };

  const handleChangeDynamicField = (field, publicationIndex, fileLinkIndex) => (event) => {
    const { value } = event.target;

    // Get the original publication item from the array of publication data objects
    const newValues = [ ...publications ];
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
    setPublications(newValues);
  };

  const handleAddPublication = (event) => {
    event.preventDefault();

    const values = [ ...publications ];
    values.push(
      {
        ...arrayToObject(staticFields),
        fileLinks: [
          {
            info: '',
            type: '',
            link: ''
          }
        ]
      }
    );
    setPublications(values);
  };

  const handleRemovePublication = (event) => {
    event.preventDefault();

    const values = [ ...publications ];
    values.pop();
    setPublications(values);
  };


  const handleAddFileLink = (event, itemIndex) => {
    event.preventDefault();

    // Remove the original object from the array at the specified index
    const values = [ ...publications ];
    const publicationItem = { ...values.splice(itemIndex, 1)[0] };

    // Add a new file link object
    publicationItem.fileLinks.push({ });

    // Add it back to the array
    values.splice(itemIndex, 0, publicationItem);

    // // Update the state
    setPublications(values);
  };

  const handleRemoveFileLink = (event, itemIndex) => {
    event.preventDefault();

    // Remove the original object from the array
    const values = [ ...publications ];
    const publicationItem = { ...values.splice(itemIndex, 1)[0] };

    // Remove a file link object
    publicationItem.fileLinks.pop();

    // Add it back to the array
    values.splice(itemIndex, 0, publicationItem);

    // Update the state
    setPublications(values);
  };  

  // Sends the values entered by the user to the backend to generate the appropriate .json file
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/publications", { userId, data: publications });
      console.log(response);
    } catch (err) {
      console.log("Error sending data to the backend: ", err);
    }
  };

  return (
    <form>
      <div className="div-publications-container">
        <h1>
          Publications page:
        </h1>
        <button onClick={handleAddPublication}> Add publication </button>
        <button onClick={handleRemovePublication}> Remove publication </button>
        {
          // Iterating over the current number of publications
          publications.map((publicationItem, publicationIndex) => (
            <div className="div-publication-item" key={`${publicationItem}-${publicationIndex}`}>
              {
                // For each publication, iterating over the static fields and for each one rendering a label and a text input
                staticFields.map(field => (
                  <Input key={field} label={field} onChange={handleChangeStaticField(field, publicationIndex)} />
                ))
              }
              <div>
                <button onClick={(event) => handleAddFileLink(event, publicationIndex)}> Add file </button>
                <button onClick={(event) => handleRemoveFileLink(event, publicationIndex)}> Remove file </button>              
              </div>
              {
                // For each publication, iterating over the file links fields
                publications[publicationIndex].fileLinks.map((fileLinkItem, fileLinkIndex) => (
                  <div className="div-publication-filelink" key={`${fileLinkItem}-${fileLinkIndex}`}>
                    <Input label="info" onChange={handleChangeDynamicField("info", publicationIndex, fileLinkIndex)} />
                    <Input label="type" onChange={handleChangeDynamicField("type", publicationIndex, fileLinkIndex)} />
                    <Input label="link" onChange={handleChangeDynamicField("link", publicationIndex, fileLinkIndex)} />
                  </div>
                ))
              }
            </div>
          ))
        }
        <button type="submit" onClick={handleSubmit}> Submit </button>
      </div>
    </form>
  );
};

export default PublicationsPage;
