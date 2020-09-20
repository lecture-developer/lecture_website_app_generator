import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DATA_KEY = 'featuredPublications';

const PublicationsDetails = ({ updateData, userId }) => {
  const [selected, setSelected] = useState([]);
  const [publications, setPublications] = useState([]);

  // On page load - get all the publications from the backend
  useEffect(() => {
    const getAllPublications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/publications", {
          params: {
            userId,
          }
        });
        setPublications(response.data);
      } catch (err) {
        console.log('ERROR: ', err);
      }
    };

    getAllPublications();
  }, [userId]);

  const handleClick = (event) => {
    const { id, checked: publicationSelected } = event.target;
    console.log(`checkbox ${id} was just clicked. its value is ${publicationSelected}`);
    let updatedSelected = [...selected ];

    /*
      If the checkbox is checked then the user wants to display the specific publication in the home page -
      add it to the array of selected, otherwise remove it from the array of selected
    */
    updatedSelected[id] = publicationSelected ? publications[id] : null;
    // updatedSelected = updatedSelected.filter(selected => selected !== null);

    setSelected(updatedSelected);
    updateData(DATA_KEY, updatedSelected);
    console.log(updatedSelected);
  }

  return (
    publications.length === 0 ? null :
      <div className="publications">
        <h1>
          Choose your featured publications: 
        </h1>
        {
          publications.map((publication, index) => (
            <div key={`publication-${index}`}>
              <input type="checkbox" id={index} name={index} onClick={handleClick} />
              <section style={{border: '2px solid black'}}>
                <h3> {publication.name} </h3>
                <p> {publication.description} </p>
              </section>
            </div>
          ))
        }
      </div>
  );
}

export default PublicationsDetails;
