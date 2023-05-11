// BuildingInfo.js

import React, { useState, useEffect } from 'react';


function FlatInfo({ match }) {
  const [buildingData, setBuildingData] = useState(null);
  const [flatData, setFlatData] = useState(null);
  const { buildingId, flatId} = match.params;
  console.log('flatid', flatId, typeof (flatId))
  
  
  useEffect(() => {
    const targetServer = process.env.REACT_APP_API_HOST;
    const api = `api/getbuildinginfo/${buildingId}`;

    fetch(targetServer + api)
      .then(response => response.json())
      .then((data) => {
        setBuildingData(data);
        setFlatDataFromBuildingData(data);
        console.log('flatdata', flatData);
      })
      .catch((error) => {
        console.error('Error fetching building data:', error);
      });
  }, []);

  console.log('building', buildingData)
  const setFlatDataFromBuildingData = (_buildingData) => {
    console.log('_buildingData.flats', _buildingData.flats);
    const flat = _buildingData.flats.find(flat =>
        {
            console.log('flat.flatid:', flat.flatid, typeof (flat.flatid));
            return (typeof flat.flatid === "number" ? flat.flatid.toString() : flat.flatid) === flatId;
        }
        
    );
    setFlatData(flat);
    console.log('flat:', flat);
  };


  return (
    <div>
    {buildingData ? 
    <div className="flat-info">
        <h1>{buildingData.title}</h1>
        <h2>{buildingData.fullAddress.city}, {buildingData.fullAddress.address}</h2>
        {flatData ?
            <h2>{flatData.flatname}</h2>
            :
            <h2>דירה לא ידועה</h2>
        }
        
    </div>
    : <h2>טוען דירה...</h2>
      }
    </div>
    );
  
}

export default FlatInfo;
