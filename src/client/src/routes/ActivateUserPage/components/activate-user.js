import React from 'react';
import axios from 'axios';

function ActivateUser (props) {
    const onActivate = async (e) => {
        try {
            const pathname = props.location.pathname;
            const segmentArray = pathname.split('/');
            const lastSegment = segmentArray.pop();

            const data = {
                token: lastSegment
              }
            try{
                const res = await axios.post('http://localhost:5000/users/activation', data);
            } catch (err){
                console.log(err);
            }  
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="col-md-12">
          <button onClick={onActivate}>Activate New User</button>
          </div>
          );
};

export default ActivateUser;