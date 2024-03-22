import axios from 'axios';
import CreateLink from '../../utils/CreateLink';
import ErrorDialog from '../../utils/ErrorDialog';

function JoinPeopleAndCompany({ updateParentClass }) {
  const runJoin = () => {
    const apiUrl = CreateLink('/join_people_company');

    axios.get(apiUrl).then(res => {
      console.log(res);
      updateParentClass(res.data);
    }).catch(error => {
      ErrorDialog(error);
    }); 
  }

  return (
    <div>
      <h4>View People's Company</h4>
      <button onClick={runJoin}>View Corresponding Company</button>
    </div>
  );
}

export default JoinPeopleAndCompany;
