import { AiOutlineHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import React from 'react'

function BuildingButton({address, city, id}) 
{
    const history = useHistory();
    const handleClick = (e) => {
        history.push(`/building/${id}`);
    };

    return (
        <div className='BuildingButton'>
            <button className="button" onClick={handleClick} id=''>
                {address}, {city}
                <span className='home-icon'><AiOutlineHome/></span>
            </button>
        </div>
    );
    }

export default BuildingButton

