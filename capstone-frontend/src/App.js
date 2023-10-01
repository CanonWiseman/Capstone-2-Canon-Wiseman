import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Router} from "./Router";
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';
import AppContext from './helpers/AppContext';
import { Loader } from './miscComponents/Loader';
import SteamApis from './api';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [allApps, setAllApps] = useState([]);
  
  useEffect(() => {
    async function getAllApps(){
        setIsLoading(true);
        const res = await SteamApis.getAllApps();
        setAllApps(res.applist.apps);
        setIsLoading(false);
    }
    getAllApps();
  },[]);

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{allApps}}>
          <NavBar/>
          <main>
            <Router/>
          </main>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
