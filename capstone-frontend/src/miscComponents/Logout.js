import React, { useContext, useEffect } from "react";
import AppContext from "../helpers/AppContext";
import { useNavigate } from "react-router-dom"; 


export function Logout(){
    const navigate = useNavigate();
    const {saveSteamId, setSteamPlayerGames, setSteamPlayerLevel, setSteamPlayerRecentlyPlayed, setSteamPlayerBadges, setSteamPlayerSummary} = useContext(AppContext);
    
    useEffect(() =>{
        setSteamPlayerSummary(null);
        setSteamPlayerBadges(null);
        setSteamPlayerRecentlyPlayed(null);
        setSteamPlayerLevel(null);
        setSteamPlayerGames(null);
        saveSteamId(null);
        navigate('/');
    })
    
}