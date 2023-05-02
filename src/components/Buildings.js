import React , {useState, useEffect} from 'react'
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import BuildingButton from "../components/BuildingButton";
import Search from '../components/Search'; 

function Buildings({}) 
{
    const [buildingsData, setBuildingsData] = useState([]);
    const [buildings, setBuildings] = useState([]);
    
    /*
    useEffect(() => {
      const targetServer = 'https://connect4udbservice.azurewebsites.net/'
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = 'https://connect4udbservice.azurewebsites.net/api/getbuildings';
      fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => setBuildingsData(data))
        .catch(error => console.error(error));
    }, []);
    */

    useEffect(() => {
      const targetUrl = 'http://localhost:7071/api/GetBuildings';
      fetch(targetUrl)
        .then(response => response.json())
        .then(data => setBuildingsData(data))
        .catch(error => console.error(error));
    }, []);

    const handleSearch = (e) => {
        const input = e.target.value;
        if (input === '') {
          setBuildings([]);
        } else {
          const filtered = filterBuildings(input);
          setBuildings(filtered);
        }
      };

    const filterBuildings = (input) => {
        const filtered = buildingsData.filter(building => {
          const regex = new RegExp(input, 'gi');
          return building.title.match(regex) || building.fullAddress.city.match(regex);
        });
        return filtered;
      }

    return (
        <div className='Buildings'>
            <h1>הבניינים שלך</h1>
        <form className="inputs">
        <button className='button-add'> הוספת בניין חדש +</button>
        <Search onChange={handleSearch} />
        
        </form>
      <div className="show-buildings">
        <h2 >יש לך {buildingsData.length} בניינים פעילים</h2>

      <div className='buildings-name'>
            
          
        {buildings.length > 0
          ? buildings.map((building) => (
              <div className="building" key={building.id}>
                <BuildingButton title={building.title} city={building.fullAddress.city} />
              </div>
            ))
          : buildingsData.map((building) => (
              <div className="building" key={building.id}>
                <BuildingButton title={building.title} city={building.fullAddress.city} />
              </div>
            ))}
            </div>
      </div>
    </div>
  );
}

export default Buildings;
