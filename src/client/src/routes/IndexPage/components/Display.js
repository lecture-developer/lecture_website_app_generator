import React, { useState } from "react";
import axios from "axios";
import DynamicFormSegment from "./DynamicFormSegment";
import StaticFormSegment from "./StaticFormSegment";
import {
  generalFields,
  publicationsFields,
  projectsFields,
} from "../resources/fields";
import "../styles/Display.css";

const Display = (props) => {
  const [formValues, setFormValues] = useState({
    biography: "",
    featuredPublications: [],
    currentProjects: [],
  });

  const _updateData = (key, data) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: data,
    }));
  };

  const _handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/index",
        formValues
      );
      console.log(response);
    } catch (err) {
      console.log("Error sending data to the backend: ", err);
    }
  };

  return (
    // <form>
    <div className="container">
      <StaticFormSegment
        title="General Details"
        name="generalDetails"
        fields={generalFields}
        updateMainData={_updateData}
      />
      <DynamicFormSegment
        title="Featured Publications"
        name="featuredPublications"
        fields={publicationsFields}
        updateMainData={_updateData}
      />
      <DynamicFormSegment
        title="Current Projects"
        name="currentProjects"
        fields={projectsFields}
        updateMainData={_updateData}
      />
      <button id="submit" onClick={_handleSubmit}>
        {" "}
        Submit{" "}
      </button>
    </div>
    // <input type='submit' onClick={_handleSubmit} />
    // </form>
  );
};

export default Display;
