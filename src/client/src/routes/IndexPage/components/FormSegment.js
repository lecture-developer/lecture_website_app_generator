import React, { useState } from 'react';
import { toSentenceCase } from "../../../resources/methods";

const FormSegment = ({ inputs, updateData }) => {

  const [values, setValues] = useState({});

  const handleChange = (rootField, field, index) => (event) => {
    const { value } = event.target;
    

  }

};

export default FormSegment;
