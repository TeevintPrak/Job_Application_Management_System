import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';
import { toast } from 'react-toastify';

function NewCompany({ onFormSubmit }) {
  const [formData, setFormData] = useState({companyID: 1, website: '', name: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/add_company');
    
    if (formData.companyID != null && 
        formData.website != null && 
        formData.name != null) {
          
      var requestObject = {
        "companyId": formData.companyID,
        "website": formData.website,
        "name": formData.name
      };

      axios.post(apiUrl, requestObject).then(res => {
        console.log(res);
        onFormSubmit();
        toast("Company added successfully");
        resetInput();
      }).catch(error => {
        ErrorDialog(error);
      });
    } 
  };

  const resetInput = () => {
    setFormData({companyID: 1, website: '', name: ''});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} className='add'>
        <h3>Add New Company:</h3>
        <div>
          <label>Company ID:</label>
          <input type="number" name="companyID" value={formData.companyID} onChange={handleChange}></input>
        </div>
        <div>
          <label>Website:</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange}></input>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}></input>
        </div>
        <button type="submit">Add Company</button>
    </form>
  );
}

export default NewCompany;
