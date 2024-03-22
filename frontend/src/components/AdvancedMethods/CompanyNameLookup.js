import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../../utils/CreateLink';
import ErrorDialog from '../../utils/ErrorDialog';

function CompanyNameLookup({ updateParentClass }) {
  const [formData, setFormData] = useState({company: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/lookup_company_name');
    
    if (formData.company != null) {
      var requestObject = {
        "companyName": formData.company
      };

      axios.post(apiUrl, requestObject).then(res => {
        console.log(res);
        updateParentClass(res.data);
        resetInput();
      }).catch((error) => {
        ErrorDialog(error);
      });
    }
  };

  const resetInput = () => {
    setFormData({email: 1});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} className='delete'>
        <h4>People Search on Company:</h4>
        <div>
            <label>Company:</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange}></input>
        </div>
        <button type="submit">Search</button>
    </form>
  );
}

export default CompanyNameLookup;
