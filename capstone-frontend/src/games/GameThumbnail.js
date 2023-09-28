import React, {useState, useEffect} from "react";
import SteamApis from "../api";
import { Loader } from "../miscComponents/Loader";

export function GameThumbnail({gameId}){
    const [gameDetails, setGameDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function getAppDetails(){
            const res = await SteamApis.getAppDetails(gameId);
            setGameDetails(res);
            console.log(res);
            setIsLoading(false);
        }
    },[]);
    
    if(isLoading){
        return <Loader/>
    }
    return (
        <div className="GameThumbnail">

        </div>
    )
}