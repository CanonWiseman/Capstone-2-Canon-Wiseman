import React, {useContext, useState, useEffect} from "react";
import AppContext from "../helpers/AppContext";
import { Loader } from "../miscComponents/Loader";

export function UserDashboard(){

    const {steamPlayerGames, steamPlayerLevel, steamPlayerRecentlyPlayed, steamPlayerBadges, steamId, steamPlayerSummary} = useContext(AppContext);
    
    const[isLoading, setIsLoading] = useState(false);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div>
                <h2>Logged In</h2>
            </div>
        )
    }
}   
