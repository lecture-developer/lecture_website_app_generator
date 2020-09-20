import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Input from '../../../components/form/Input';

const DATA_KEY = 'featuredPublications';

const PublicationsDetails = ({ updateData, userId }) => {
  const [publications, setPublications] = useState([]);
  userId = '123456789';

  // On page load - get all the publications from the backend
  useEffect(() => {
    const getAllPublications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/publications", {
          params: {
            userId,
          }
        });
        setPublications(response);
      } catch (err) {
        console.log('ERROR: ', err);
      }
    };

    getAllPublications();
  }, [userId]);

  return (
  publications.length === 0 ? <h1> empty </h1> : <h1> meow </h1>
  );
}

export default PublicationsDetails;
