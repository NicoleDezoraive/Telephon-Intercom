import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';

function BuildingButton({address, city}) 
{
     
    const handleClick = (e) => {
       
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

