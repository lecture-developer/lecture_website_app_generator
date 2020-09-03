import React, { useState } from 'react';
import Input from '../../../components/form/Input';

const DATA_KEY = 'featuredPublications';

const PublicationsDetails = ({ updateData }) => {
  const [publications, setPublications] = useState(
    [
      {
        name: '',
        description: '',
        year: '',
        authors: '',
        topic: '',
        type: '',
        publisher: '',
        publicationStatus: '',
        fileLinks: [
          {
              info: '',
              type: '',
              link: '',
          }
        ]
      },
    ]
  );

  const handleStaticFieldChange = (field, index) => (event) => {
    // Get the current values
    const { value } = event.target;
    const updatedPublications = [ ...publications ];

    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: value,
    };

    // Set the current state to the updated state and send the data to the main data component
    setPublications(updatedPublications);
    updateData(DATA_KEY, publications);
    console.log(publications);
  };

  // 'field' is the name of the field inside the 'fileLinks' object
  const handleFileLinkChange = (field, publicationIndex, fileIndex) => (event) => {
    // Get the current values
    const { value } = event.target;
    const updatedPublications = [ ...publications ];

    // Remove the specific publication object and the file links array inside it
    let publication = { ...updatedPublications.splice(publicationIndex, 1)[0] };
    let fileLinksArray = publication.fileLinks;

    // Remove the specific item object from the array
    let fileLinkItem = fileLinksArray.splice(fileIndex, 1)[0];

    // Update the object
    fileLinkItem = {
      ...fileLinkItem,
      [field]: value
    };
    // Update the array
    fileLinksArray.splice(fileIndex, 0, fileLinkItem);

    // Add the updated publication to the array of publications
    updatedPublications.splice(publicationIndex, 0, publication);

    // Update the local state and send the data to the main data component
    setPublications(updatedPublications);
    updateData(DATA_KEY, publications);
  };

  const handleAddPublication = () => {
    setPublications(prev => ([
      ...prev,
      {
        name: '',
        description: '',
        year: '',
        authors: '',
        topic: '',
        type: '',
        publisher: '',
        publicationStatus: '',
        fileLinks: [
          {
              info: '',
              type: '',
              link: '',
          }
        ]
      },
    ]));
  };

  const handleRemovePublication = () => {
    const updatedPublications = [ ...publications ];
    updatedPublications.pop();
    setPublications(updatedPublications);
  };

  const handleAddFileLink = (index) => {
    // Get the original object from the array at the specified index (splice returns an array so get the 0th item)
    const updatedPublications = [ ...publications ];
    let publication = updatedPublications.splice(index, 1)[0];
    
    // Add a new file link object
    publication = {
      ...publication,
      fileLinks: [
        ...publication.fileLinks,
        {
          info: '',
          type: '',
          link: '',
        }
      ]
    };

    // Add the updated publication object back to the array
    updatedPublications.splice(index, 0, publication);

    // Update the local state
    setPublications(updatedPublications);
  };

  const handleRemoveFileLink = (index) => {
    // Get the original object from the array at the specified index (splice returns an array so get the 0th item)
    const updatedPublications = [ ...publications ];
    let publication = updatedPublications.splice(index, 1)[0];

    // Remove a file link object from the publication item
    publication.fileLinks.pop();

    // Add the updated publication object back to the array
    updatedPublications.splice(index, 0, publication);

    // Update the local state
    setPublications(updatedPublications);
  };

  return (
    <div className="div-publications">
      <h1>
        Publications:
      </h1>
      <button onClick={handleAddPublication}> Add publication </button>
      <button onClick={handleRemovePublication}> Remove publication </button>
      {
        publications.map((publication, index) => (
          <div className="div-publication" key={`${publication}-${index}`}>
            <Input label="name" onChange={handleStaticFieldChange("name", index)} />
            <Input label="description" onChange={handleStaticFieldChange("description", index)} />
            <Input label="year" onChange={handleStaticFieldChange("year", index)} />
            <Input label="authors" onChange={handleStaticFieldChange("authors", index)} />
            <Input label="topic" onChange={handleStaticFieldChange("topic", index)} />
            <Input label="type" onChange={handleStaticFieldChange("type", index)} />
            <Input label="publisher" onChange={handleStaticFieldChange("publisher", index)} />
            <Input label="publicationStatus" onChange={handleStaticFieldChange("publicationStatus", index)} />

            <button onClick={() => handleAddFileLink(index)}> Add file </button>
            <button onClick={() => handleRemoveFileLink(index)}> Remove file </button>
            {  
              publication.fileLinks.map((fileItem, fileIndex) => (
                <div className="div-publication-fileLink" key={`${fileItem}-${fileIndex}`}>
                  <Input label="info" onChange={handleFileLinkChange("info", index, fileIndex)} />
                  <Input label="type" onChange={handleFileLinkChange("type", index, fileIndex)} />
                  <Input label="link" onChange={handleFileLinkChange("link", index, fileIndex)} />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

export default PublicationsDetails;
