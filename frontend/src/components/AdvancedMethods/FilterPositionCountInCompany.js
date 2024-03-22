import axios from 'axios';
import { useState } from 'react';
import CreateLink from '../../utils/CreateLink';
import ErrorDialog from '../../utils/ErrorDialog';

function FilterPositionCountInCompany({ updateParentClass }) {
  const [formData, setFormData] = useState({threshold: 0});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = CreateLink('/filter_count_positions_in_company');
    
    if (formData.threshold != null) {
      var requestObject = {
        "threshold": formData.threshold
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
        <h4>Min Number Of Positions Per Company:</h4>
        <div>
            <label>Positions:</label>
            <input type="number" name="threshold" value={formData.threshold} onChange={handleChange}></input>
        </div>
        <button type="submit">Search</button>
    </form>
  );
}

export default FilterPositionCountInCompany;
