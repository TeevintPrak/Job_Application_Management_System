import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';
import { toast } from 'react-toastify';

function NewPerson({ onFormSubmit }) {
  const [formData, setFormData] = useState({ email: '', companyID: 1, role: '', firstName: '', lastName: '', industry: '', department: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/add_people');
    
    if (formData.email != null && 
      formData.companyID != null && 
      formData.role != null &&
      formData.firstName != null && 
      formData.lastName != null && 
      formData.industry != null && 
      formData.department != null) {
      var requestObject = {
        "email": formData.email,
        "companyId": formData.companyID,
        "role": formData.role,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "industry": formData.industry,
        "department": formData.department
      };

      axios.post(apiUrl, requestObject).then(res => {
        console.log(res);
        onFormSubmit();
        toast("Person added successfully");
        resetInput();
      }).catch(error => {
        ErrorDialog(error);
      });
    }
  };

  const resetInput = () => {
    setFormData({ email: '', companyID: 1, role: '', firstName: '', lastName: ''});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} className='add'>
        <h3>Add New Person:</h3>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required></input>
        </div>
        <div>
          <label>Company Id:</label>
          <input type="number" name="companyID" value={formData.companyID} onChange={handleChange}></input>
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange}></input>
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}></input>
        </div>
        <div>
          <label>Industry:</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange}></input>
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange}></input>
        </div>
        <button type="submit">Add Person</button>
    </form>
  );
}

export default NewPerson;
