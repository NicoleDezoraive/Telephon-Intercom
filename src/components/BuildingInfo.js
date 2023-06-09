// BuildingInfo.js

import React, { useState, useEffect } from 'react';
import FlatTable from './FlatTable';

function BuildingInfo({ match }) {
  const [buildingData, setBuildingData] = useState(null);
  const { buildingId } = match.params;

  useEffect(() => {
    const targetServer = process.env.REACT_APP_API_HOST;
    const api = `api/getbuildinginfo/${buildingId}`;

    fetch(targetServer + api)
      .then(response => response.json())
      .then((data) => {
        setBuildingData(data);
      })
      .catch((error) => {
        console.error('Error fetching building data:', error);
      });
  }, []);

  return (
    <div>
    {buildingData ? 
    <div className="building-info">
        <h1>{buildingData.title}</h1>
        <h2>{buildingData.fullAddress.city}, {buildingData.fullAddress.address}</h2>
        <FlatTable flatinfo={buildingData.flats} buildingid={buildingId} ></FlatTable>
    </div>
    : <h2>טוען בניין...</h2>
      }
    </div>
    );
  
}

export default BuildingInfo;
