import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { v4 as uuidv4 } from 'uuid';

export function UserBadges({steamId}){

    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerBadges, setSteamPlayerBadges] = useState(null);

    useEffect(() => {
        async function getPlayerBadges(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerBadges = await SteamApis.getPlayerBadges(steamId);
                setSteamPlayerBadges(playerBadges.response);
                setIsLoading(false);
          }
        }
        getPlayerBadges();
    }, [steamId]);

    console.log(steamPlayerBadges);
    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <></>
        )
    }
    
}