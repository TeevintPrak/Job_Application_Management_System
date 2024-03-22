import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';
import { toast } from 'react-toastify';

function DeletePerson({ onFormSubmit }) {
  const [formData, setFormData] = useState({email: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/delete_people');
    
    if (formData.email != null) {
      var requestObject = {
        "email": formData.email
      };

      axios.post(apiUrl, requestObject).then(res => {
        console.log(res);
        toast("Person deletion successful");
        onFormSubmit();
        resetInput();
      }).catch(error => {
        ErrorDialog(error);
      });
    }
  };

  const resetInput = () => {
    setFormData({email: ''});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} className='delete'>
        <h3>Delete Person:</h3>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}></input>
        </div>
        <button type="submit">Delete Person</button>
    </form>
  );
}

export default DeletePerson;
