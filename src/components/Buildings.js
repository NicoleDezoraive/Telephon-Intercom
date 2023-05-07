import React , {useState, useEffect} from 'react'
import BuildingButton from "../components/BuildingButton";
import { AiOutlineSearch } from 'react-icons/ai';

function Buildings({}) 
{
    const [buildingsData, setBuildingsData] = useState(null);
    const [initialBuildings, setInitialBuildingsData] = useState(null);
    
    useEffect(() => {
      const targetServer = process.env.REACT_APP_API_HOST
      const api = 'api/getbuildings'
      fetch(targetServer + api)
        .then(response => response.json())
        .then(data => {
          setBuildingsData(data);
          setInitialBuildingsData(data);
        }
        )
        .catch(error => console.error(error));
    }, []);
    
    
    const addBuilding = async (building) => {
        const targetServer = process.env.REACT_APP_API_HOST
        const api = 'api/addbuilding'
        //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //const targetUrlAddBuilding = 'https://connect4udbservice.azurewebsites.net/api/addbuilding';
        try {
          const response = await fetch(targetServer + api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(building),
          });
          const data = await response.json();
          setBuildingsData((prevBuildingsData) => [...prevBuildingsData, data]);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleAddBuildingClick = () => {
        const newWindow = window.open('', '_blank', 'width=800,height=550');
        newWindow.document.write(`
            <form id="addBuildingForm">
                <label>כותרת</label>
                <input type="text" name="title" required><br>
                <label>מספר דירות</label>
                <input type="number" name="numflats" required><br>
                <label>קוד דלת כניסה</label>
                <input type="text" name="doorcode" required><br>
                <label>כתובת מלאה</label>
                <input type="text" name="city" placeholder="עיר" required>
                <input type="text" name="address" placeholder="כתובת" required>
                <input type="text" name="country" placeholder="מדינה" required><br>
                <button type="submit">שלח</button>
            </form>
        `);
    
        const head = newWindow.document.head;
        const style = newWindow.document.createElement("style");
        style.innerHTML = `
            body {
                background-color: lightblue;
                direction: rtl;
                text-align: center;
            }
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 500px;
                height: 500px;
                margin: 0 auto;
                padding: 20px;
                background-color: white;
            }
            input[type="text"], input[type="number"] {
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                direction: ltr;
                text-align: right;
            }
            button[type="submit"] {
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            button[type="submit"]:hover {
                background-color: #45a049;
            }
        `;
        head.appendChild(style);
    
        const addBuildingForm = newWindow.document.getElementById("addBuildingForm");
        addBuildingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(addBuildingForm);
            const building = {
                title: formData.get('title'),
                numflats: parseInt(formData.get('numflats')),
                doorcode: formData.get('doorcode'),
                fullAddress: {
                    city: formData.get('city'),
                    address: formData.get('address'),
                    country: formData.get('country'),
                },
            };
            console.log(building);
            addBuilding(building);
            newWindow.close();
        });
    };
    

    const handleSearch = (e) => {
        const input = e.target.value;
        const filtered = filterBuildings(input);
        setBuildingsData(filtered);
      };

    const filterBuildings = (input) => {
        if (!input) {
          return initialBuildings;
        }
        const regex = new RegExp(input, 'gi');
        const filtered = initialBuildings.filter(
          (building) =>
            (building.title ? building.title.match(regex) : false) || building.fullAddress.city.match(regex) || building.fullAddress.address.match(regex)
        );
        return filtered;
      };

return (
    <div className='Buildings'>
      <h1>הבניינים שלך</h1>
      <div className='inputs'>
        <button className='button-add' onClick={handleAddBuildingClick}> הוספת בניין חדש +</button>
        <div className='search'>
          <AiOutlineSearch />
          <input
            className='form-control form-control-sm ml-3 w-75 search-input'
            type='text'
            placeholder='חיפוש'
            aria-label='Search'
            name='buildings'
            onChange={handleSearch}
          />
          <label>כתובת הבניין</label>
        </div>
      </div>
      {buildingsData ? 
      <div className='show-buildings'>
        <h2>יש לך {buildingsData ? buildingsData.length : 0} בניינים פעילים</h2>
        <div className='buildings-name'>

          {buildingsData.map((building) => (
            <div className='building' key={building.id}>
              <BuildingButton
                address={building.fullAddress.address}
                city={building.fullAddress.city}
                id={building.id}
              />
            </div>
          ))}
        </div>
      </div>
      : (
        <p>...טוען</p>
      )}
      
    </div>
  );
}

export default Buildings;
