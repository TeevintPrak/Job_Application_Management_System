import axios from 'axios';
import { useState, useEffect } from 'react';
import CreateLink from '../utils/CreateLink';
import JoinPeopleAndCompany from '../components/AdvancedMethods/JoinPeopleAndCompany';
import CompanyNameLookup from '../components/AdvancedMethods/CompanyNameLookup';
import PositionPerCompany from '../components/AdvancedMethods/PositionPerCompany';
import FilterPositionCountInCompany from '../components/AdvancedMethods/FilterPositionCountInCompany';
import CommonDepartmentAcrossAllCompanies from '../components/AdvancedMethods/CommonDepartmentAcrossAllCompanies';
import ViewNumberOfConnections from '../components/AdvancedMethods/ViewNumberConnections';


// This file lists the people out in a table view. For the people page, see the pages folder for 'PeoplePage.js'
function AdvancedPeopleMethods() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let timer = setTimeout(()=>{
      updatePeople();
    }, 250)

    return () => clearTimeout(timer);
    
  }, []);

  const updatePeople = () => {
    // Proxy is set to http://localhost:3001 in the package.json file. Change over there if you need a different port
    const apiUrl = CreateLink('/get_people');

    axios.get(apiUrl).then(res => {
      setData(res.data);
    }).catch(error => {
      if (error.name ?? error.name === "AxiosError") {
        alert("Something wrong with the network. Could not load people");
      } else {
        alert(error);
      }
    });
  };

  return (
    <div>
        <div className="people">
            <div className='currentPeople'>
            <h3>Advanced People and Company View</h3>
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
        </div>
        <div className='advanced-people'>
            <JoinPeopleAndCompany updateParentClass={setData}/>
            <CompanyNameLookup updateParentClass={setData} />
            <PositionPerCompany updateParentClass={setData} />
            <FilterPositionCountInCompany updateParentClass={setData} />
            <CommonDepartmentAcrossAllCompanies updateParentClass={setData} />
            <ViewNumberOfConnections updateParentClass={setData} />
        </div>
    </div>
  );
}

export default AdvancedPeopleMethods;
