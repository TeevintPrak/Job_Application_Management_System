import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';
import { toast } from 'react-toastify';

function UpdateCompany({ onFormSubmit }) {
  const [formData, setFormData] = useState({oldCID: 1, newWebsite: '', newName: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/update_company');
    
    if (formData.oldCID !== null && 
        formData.newWebsite != null && 
        formData.newName != null) {
      
      var requestObject = {
        "oldCID": formData.oldCID,
        "newWebsite": formData.newWebsite,
        "newName": formData.newName
      }
      
      axios.post(apiUrl, requestObject).then(res => {
        console.log(res);
        onFormSubmit();
        toast("Successfully updated company");
        resetInput();
      }).catch(error => {
        ErrorDialog(error);
      });
    }
  };

  const resetInput = () => {
    setFormData({oldCID: 1, newWebsite: '', newName: ''});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} className='update'>
        <h3>Update Company:</h3>
        <div>
          <label>Company ID:</label>
          <input type="number" name="oldCID" value={formData.oldCID} onChange={handleChange}></input>
        </div>
        <div>
          <label>New Website:</label>
          <input type="text" name="newWebsite" value={formData.newWebsite} onChange={handleChange}></input>
        </div>
        <div>
          <label>New Name:</label>
          <input type="text" name="newName" value={formData.newName} onChange={handleChange}></input>
        </div>
        <button type="submit">Update Company</button>
    </form>
  );
}

export default UpdateCompany;