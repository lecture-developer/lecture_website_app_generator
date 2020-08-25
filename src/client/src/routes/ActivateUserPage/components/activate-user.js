import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ActivateUser(props) {
    try {
        console.log(window.location.href);
        //const res = await axios.post('http://localhost:5000/users/activation', user);
    }
    catch (err) {
        console.log(err);
    }
};

export default ActivateUser;