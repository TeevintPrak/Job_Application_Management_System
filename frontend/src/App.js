import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import CreateLink from './utils/CreateLink';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PeoplePage from './pages/PeoplePage';
import CompaniesPage from './pages/CompaniesPage';
import Home from './pages/Home';
import Finder from './pages/Finder';
import AdvancedPeopleView from './pages/AdvancedPeopleViews';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Proxy is set to http://localhost:3001 in the package.json file. Change there if you need a different port
    const apiUrl = CreateLink('/test'); 

    axios.get(apiUrl, {responseType: 'text'}).then(res => {
      console.log("Successfully connected to the API");
      setData(res.data);
    }).catch(error => {
      console.log('Could not recieve data from API:', error);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/people" Component={PeoplePage} />
          <Route path="/companies" Component={CompaniesPage} />
          <Route path="/finder" Component={Finder} />
          <Route path="/advanced_people_view" Component={AdvancedPeopleView} />
          <Route path="/" exact Component={Home} />
        </Routes>
        <nav>
          <ul className='navigation'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/finder">Finder</Link>
            </li>
            <li>
              <Link to="/advanced_people_view">Advanced People And Company View</Link>
            </li>
          </ul>
        </nav>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
