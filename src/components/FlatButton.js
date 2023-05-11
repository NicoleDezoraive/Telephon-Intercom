import { AiOutlineHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import React from 'react'

function FlatButton({buildingid, flatid, flatname}) 
{
    const history = useHistory();
    const handleClick = (e) => {
        history.push(`/building/${buildingid}/${flatid}`);
    };

    return (
        <div className='FlatButton'>
            <button className="button" onClick={handleClick} buildingid={buildingid} flatid={flatid}>
                {flatname ? flatname : flatid}
                <span className='home-icon'><AiOutlineHome/></span>
            </button>
        </div>
    );
}

export default FlatButton

