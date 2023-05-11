import FlatButton from "./FlatButton";

export default function FlatTable({flatinfo, buildingid}) {
    // Table component logic and UI come here
    console.log(flatinfo)
    console.log(buildingid)
  
    return (
      <div className='Flats'>
      <div className='show-flats'>
        <h2>מראה {flatinfo.length} דירות בבניין</h2>
        <div className='buildings-name'>

          {flatinfo.map((flat) => (
            <div className='flat' key={`${buildingid}/${flat.flatid}`}>
              <FlatButton
                buildingid={buildingid}
                flatid={flat.flatid}
                flatname={flat.flatname}
              />
            </div>
          ))}
        </div>
      </div>
    </div>    
      );
 }