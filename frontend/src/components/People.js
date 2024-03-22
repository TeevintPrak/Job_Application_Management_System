import axios from 'axios';
import { useState, useEffect } from 'react';
import NewPerson from './NewPerson';
import DeletePerson from './DeletePerson';
import CreateLink from '../utils/CreateLink';
import PeopleSelection from '../components/PeopleSelection';
import ErrorDialog from '../utils/ErrorDialog';

// This file lists the people out in a table view. For the people page, see the pages folder for 'PeoplePage.js'
function People() {
  const [data, setData] = useState(null);
  const [PeopleDelete, setPeopleDelete] = useState(null);
  const [PeopleNew, setPeopleNew] = useState(null);

  useEffect(() => {
    let timer = setTimeout(()=>{
      updatePeople();
    }, 250)

    return () => clearTimeout(timer);
    
  }, [PeopleNew, PeopleDelete]);

  const updatePeople = () => {
    // Proxy is set to http://localhost:3001 in the package.json file. Change over there if you need a different port
    const apiUrl = CreateLink('/get_people');

    axios.get(apiUrl).then(res => {
      setData(res.data);
    }).catch(error => {
      ErrorDialog(error);
    });
  };

  return (
    <div>
      <div className="people">
        <div className='currentPeople'>
          <h3>Current people:</h3>
          <table className="peopleTable">
            <thead className="peopleTableHead" >
              <tr>
                {data ? data.metaData.map((elem, index) => 
                  <th>{elem.name}</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {data ? data.rows.map((row, rowIndex) => 
              <tr key={rowIndex}>
                {row ? row.map((elem, index) => 
                  <td key={index}>{elem}</td>
                ) : null}
              </tr>) : 'Loading people from database'}
            </tbody>
          </table>
        </div>
        <div className="peopleTableEdit">
          <div className='newPerson'>
            <NewPerson onFormSubmit={() => setPeopleNew(!PeopleNew)}/>
          </div>
          <div className='deletePerson'>
            <DeletePerson onFormSubmit={() => setPeopleDelete(!PeopleDelete)}/>
          </div>
          <div>
            <h3>Filter:</h3>
            <PeopleSelection updateParentData={setData} clearFilter={updatePeople} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
