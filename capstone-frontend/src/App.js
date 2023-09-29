import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Router} from "./Router";
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';
import AppContext from './helpers/AppContext';
import { Loader } from './miscComponents/Loader';
import SteamApis from './api';
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [allApps, setAllApps] = useState([]);
  const [steamId, saveSteamId] = useLocalStorage('steamId', null);
  const [steamPlayerGames, setSteamPlayerGames] = useState(null);
  const [steamPlayerLevel, setSteamPlayerLevel] = useState(null);
  const [steamPlayerRecentlyPlayed, setSteamPlayerRecentlyPlayed] = useState(null);
  const [steamPlayerBadges, setSteamPlayerBadges] = useState(null);
  const [steamPlayerSummary, setSteamPlayerSummary] = useState(null);
  

  useEffect(() => {
    
    async function getPlayerData(){
      setIsLoading(true);
      if(!steamId && steamId !== null){
        const playerGames = await SteamApis.getPlayerGames(steamId);
        setSteamPlayerGames(playerGames.response);
        const playerLevel = await SteamApis.getPlayerLevel(steamId);
        setSteamPlayerLevel(playerLevel.response);
        const playerRecentlyPlayed = await SteamApis.getPlayerRecentlyPlayed(steamId);
        setSteamPlayerRecentlyPlayed(playerRecentlyPlayed.response);
        const playerBadges = await SteamApis.getPlayerBadges(steamId);
        setSteamPlayerBadges(playerBadges.response);
        const playerSummary = await SteamApis.getPlayerSummary(steamId);
        setSteamPlayerSummary(playerSummary.response.players[0]);
        console.log(steamPlayerSummary);
      }
      setIsLoading(false);
    }
    getPlayerData();
    
  }, [steamId]);

  useEffect(() => {
    setIsLoading(true);
    async function getAllApps(){
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
        <AppContext.Provider value={{allApps, steamPlayerGames, steamPlayerLevel, steamPlayerRecentlyPlayed, steamPlayerBadges, steamId, steamPlayerSummary, saveSteamId, setSteamPlayerGames, setSteamPlayerLevel, setSteamPlayerRecentlyPlayed, setSteamPlayerBadges, setSteamPlayerSummary}}>
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
