import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';
import { toast } from 'react-toastify';

function DeleteCompany({ onFormSubmit }) {
  const [formData, setFormData] = useState({companyID: 1});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/delete_company');
    
    if (formData.companyID != null) {
      var requestObject = {
        "companyID": formData.companyID
      };

      axios.post(apiUrl, requestObject).then(res => {
        console.log(res);
        onFormSubmit();
        toast("Company deletion successful");
        resetInput();
      }).catch(error => {
        ErrorDialog(error);
      });
    }
    
  };

  const resetInput = () => {
    setFormData({companyID: 1});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} className='delete'>
        <h3>Delete Company:</h3>
        <div>
          <label>Company ID:</label>
          <input type="number" name="companyID" value={formData.companyID} onChange={handleChange} required></input>
        </div>
        <button type="submit">Delete Company</button>
    </form>
  );
}

export default DeleteCompany;
