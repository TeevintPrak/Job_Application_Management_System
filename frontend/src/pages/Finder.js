import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateLink from '../utils/CreateLink';
import Select from 'react-select';
import ProjectionTableView from '../components/ProjectionTableView';
import ErrorDialog from '../utils/ErrorDialog';

const Finder = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('Unselected');
    const [attributes, setTableAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    useEffect(() => {
        // Proxy is set to http://localhost:3001 in the package.json file. Change over there if you need a different port
        const apiUrl = CreateLink('/get_all_tables');

        axios.get(apiUrl).then(res => {
            setTables(res.data);
        }).catch(error => {
            ErrorDialog(error);
        });
    }, []);

    const handleSelectedTableChange = (event) => {
        setSelectedAttributes([]);
        setSelectedTable(event.target.value);
        axios.get(CreateLink(`/get_table_attributes?table=${event.target.value}`)).then(res => {
            const parsedData = res.data.map((string) => ({
                value: string,
                label: string.charAt(0).toUpperCase() + string.slice(1)
            }));
            setTableAttributes(parsedData);
        }).catch(error => {
            ErrorDialog(error);
        });
    }   

    const handleSelectedAttributesChange = (selected) => {
        setSelectedAttributes(selected);
    }
    
    return (
        <div>
            <h1>Finder</h1>
            <p>Find data in your management system</p>
            {tables.length === 0 ? <p>Loading</p> :
                <select onChange={handleSelectedTableChange}>
                    <option key={-1}>Select a table</option>
                    {tables.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            } 
            {attributes.length === 0 ? <p>Table not selected</p> :
                <Select
                    key={`key_${attributes[0]}`}
                    closeMenuOnSelect={false}
                    isMulti
                    value={selectedAttributes}
                    onChange={handleSelectedAttributesChange}
                    options={attributes}
                />}
            <ProjectionTableView table={selectedTable} attributes={selectedAttributes} />
        </div>
    )
}

export default Finder;
