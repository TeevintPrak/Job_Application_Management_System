import axios from 'axios';
import CreateLink from '../../utils/CreateLink';
import ErrorDialog from '../../utils/ErrorDialog';

function PositionPerCompany({ updateParentClass }) {
  const run = () => {
    const apiUrl = CreateLink('/position_per_company');

    axios.get(apiUrl).then(res => {
      console.log(res);
      updateParentClass(res.data);
    }).catch(error => {
      ErrorDialog(error);
    });  
  }

  return (
    <div>
      <h4>Average Connections per Company:</h4>
      <button onClick={run}>View Average Per Company</button>
    </div>
  );
}

export default PositionPerCompany;
