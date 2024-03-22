import axios from 'axios';
import { useState, useEffect } from 'react';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';

const ProjectionTableView = (props) => {
    const [data, setData] = useState(null);
    const [table, setTable] = useState(null);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        setTable(props.table);
        setAttributes(props.attributes);

        if (props.attributes.length === 0) {
          setData();
        } else {
          const apiUrl = CreateLink('/project_tables');

          var requestObject = {
            columns: props.attributes.map(obj => obj.value),
            table: props.table
          }

          axios.post(apiUrl, requestObject).then(res => {
            setData(res.data);
          }).catch(error => {
            ErrorDialog(error);
          });
        }
    }, [props.table, props.attributes]);

    return (
      <table className="projectionTable">
        <thead >
          <tr>
            {data && data.metaData ? data.metaData.map((elem, index) => 
              <th>{elem.name}</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
            {data && data.rows ? data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row ? row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              )): null}
            </tr>
          )) : null }
        </tbody>
      </table>
    );
}

export default ProjectionTableView;