import axios from 'axios';
import CreateLink from '../../utils/CreateLink';
import ErrorDialog from '../../utils/ErrorDialog';

function ViewNumberOfConnections({ updateParentClass }) {
  const runJoin = () => {
    const apiUrl = CreateLink('/number_people_company');

    axios.get(apiUrl).then(res => {
      console.log(res);
      updateParentClass(res.data);
    }).catch(error => {
      ErrorDialog(error);
    });  
  }

  return (
    <div>
      <h4>View Number Of People in Companies</h4>
      <button onClick={runJoin}>View</button>
    </div>
  );
}

export default ViewNumberOfConnections;
