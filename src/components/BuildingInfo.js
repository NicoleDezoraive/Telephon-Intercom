// BuildingInfo.js

import React, { useState, useEffect } from 'react';

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
  }, [buildingId]);

  return (
    <div className="building-info">
      {buildingData ? (
        <>
          <h2>{buildingData.title}</h2>
          <p>{buildingData.fullAddress.city}, {buildingData.fullAddress.address}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BuildingInfo;
