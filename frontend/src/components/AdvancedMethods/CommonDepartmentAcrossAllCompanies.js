import axios from 'axios';
import CreateLink from '../../utils/CreateLink';
import ErrorDialog from '../../utils/ErrorDialog';

function CommonDepartmentAcrossAllCompanies({ updateParentClass }) {
  const run = () => {
    const apiUrl = CreateLink('/division_department_company');

    axios.get(apiUrl).then(res => {
      console.log(res);
      updateParentClass(res.data);
    }).catch(error => {
      ErrorDialog(error);
    });  
  }

  return (
    <div>
      <h4>Find Common Department Each Companies Has</h4>
      <button onClick={run}>Find</button>
    </div>
  );
}

export default CommonDepartmentAcrossAllCompanies;
