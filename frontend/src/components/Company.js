import axios from 'axios';
import { useState, useEffect } from 'react';
import NewCompany from './NewCompany';
import CreateLink from '../utils/CreateLink';
import DeleteCompany from './DeleteCompany';
import UpdateCompany from './UpdateCompany';
import ErrorDialog from '../utils/ErrorDialog';

// This file lists the Company out in a table view. For the Company page, see the pages folder for 'CompanyPage.js'
function Company() {
  const [data, setData] = useState(null);
  const [CompanyDelete, setCompanyDelete] = useState(null);
  const [CompanyNew, setCompanyNew] = useState(null);
  const [CompanyUpdate, setCompanyUpdate] = useState(null);

  useEffect(() => {
    let timer = setTimeout(()=>{
      updateCompany();
    }, 250)

    return () => clearTimeout(timer);
    
  }, [CompanyNew, CompanyDelete, CompanyUpdate]);

  const updateCompany = () => {
    // Proxy is set to http://localhost:3001 in the package.json file. Change over there if you need a different port
    const apiUrl = CreateLink('/get_company');
    console.log('ran');
    axios.get(apiUrl).then(res => {
      setData(res.data);
    }).catch(error => {
      ErrorDialog(error);
    });
  };

  return (
    <div className="company">
      <div>
        <h3>Current Company:</h3>
        <table className="companyTable">
          <thead>
            <tr>
              <th>Company ID</th>
              <th>Website</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data ? data.rows.map((elem) => 
            <tr>
              <td>{elem[0]}</td>
              <td>{elem[1]}</td>
              <td>{elem[2]}</td>
            </tr>) : 'Loading Company from database'}
          </tbody>
        </table>
      </div>
      <div className="companyTableEdit">
        <div className='newCompany'>
          <NewCompany onFormSubmit={() => setCompanyNew(!CompanyNew)}/>
        </div>
        <div className='deleteCompany'>
          <DeleteCompany onFormSubmit={() => setCompanyDelete(!CompanyDelete)}/>
        </div>
        <div className='updateCompany'>
          <UpdateCompany onFormSubmit={() => setCompanyUpdate(!CompanyUpdate)}/>
        </div>
      </div>
    </div>
  );
}

export default Company;