import React from 'react';
import axios from 'axios';

const onActivate = async (e) => {
    try {
        const pathname = e.location.pathname;
        const segmentArray = pathname.split('/');
        const lastSegment = segmentArray.pop();

        const data = {
            token: lastSegment
          }
        try{
            await axios.post('http://localhost:5000/users/activation', data);
        } catch (err){
            console.log(err);
        }  
    }
    catch (err) {
        console.log(err);
    }
}

function ActivateUser (props) {
    return (
        <div className="col-md-12">
          <button onClick={() => onActivate(props)}>Activate New User</button>
          </div>
          );
};

export default ActivateUser;