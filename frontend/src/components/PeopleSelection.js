import axios from 'axios';
import { useState } from 'react';
import ParseFilter from '../utils/ParseFilters';
import CreateLink from '../utils/CreateLink';
import ErrorDialog from '../utils/ErrorDialog';

const PeopleSelection = ({ updateParentData, clearFilter }) => {
    const [elements, setElements] = useState([{ id: 1, type: null, attribute: '', equals: '' }]); // Set with one possible filter at first

    const addElement = () => {
        let newElement;
        if (elements.length == 0) {
            newElement = { id: 1, type: null, attribute: '', equals: '' };
        } else {
            newElement = { id: elements.length + 1, type: 'AND', attribute: '', equals: '' };
        }
        setElements([...elements, newElement]);
    };

    const removeElement = (id) => {
        let updatedElements = elements.filter((element) => element.id !== id);
        updatedElements = updatedElements.map((element, index) => ({
            ...element,
            id: index + 1,
        }));
        if (id === elements[0].id && updatedElements.length > 0) {
            updatedElements[0].type = null;
        }
        if (updatedElements.length == 0) {
            clearFilter();
        }        
        setElements(updatedElements);
    };

    const updateElementType = (id, newType) => {
        const updatedElements = elements.map((element) => 
            element.id === id ? { ...element, type: newType } : element
        );
        setElements(updatedElements);
    }

    const updateInputValue = (id, inputName, newValue) => {
        const updatedElements = elements.map((element) => 
            element.id === id ? { ...element, [inputName]: newValue } : element
        );
        setElements(updatedElements);
    }

    const runFilter = () => {
        // When the filter has been called we want to send a request to the selection query
        const apiUrl = CreateLink('/filter_people');
        if (elements.length === 0) {
            clearFilter();
        } else {
            const whereClause = ParseFilter(elements);
            console.log(elements);
        
            var requestObject = {
              whereClause: whereClause
            }
        
            axios.post(apiUrl, requestObject).then(res => {
              updateParentData(res.data);
            }).catch(error => {
                ErrorDialog(error);
            });
        }
      }

    return (
        <div className='filter'>
            <button onClick={addElement}>Add Filter</button>
            {elements.map((element, index) => (
                <div key={element.id}>
                    {index > 0 ? 
                    <select
                        value={element.type}
                        onChange={(e) => updateElementType(element.id, e.target.value)}
                        className='andOrSelection'
                    >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                    </select> : null}
                    <div>
                        <input 
                            type="text" 
                            value={element.attribute}
                            placeholder='Attribute'
                            onChange={(e) => updateInputValue(element.id, 'attribute', e.target.value)}
                        />
                        <input 
                            type="text"
                            value={element.equals}
                            placeholder='Equals'
                            onChange={(e) => updateInputValue(element.id, 'equals', e.target.value)}
                        />
                    </div>
                    <button onClick={() => removeElement(element.id)}>Remove</button>
                </div>
            ))}
            <button onClick={runFilter}>Run Filter</button>
        </div>
    )
}

export default PeopleSelection;