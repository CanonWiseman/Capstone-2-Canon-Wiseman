import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Router} from "./Router";
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';
import AppContext from './helpers/AppContext';
import { Loader } from './miscComponents/Loader';
import SteamApis from './api';
import Fuse from "fuse.js";


function App() {

  const fuseOptions  = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["appid", "name"],
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllApps(){
        const res = await SteamApis.getAllApps();
        setIsLoading(false);
        const fuse = new Fuse(res.applist.apps, fuseOptions);
        const fuseResult = fuse.search("baldurs");
    }
    getAllApps();
  },[]);


  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Router/>
        </main> 
      </BrowserRouter>
    </div>
  );
  
}

export default App;
