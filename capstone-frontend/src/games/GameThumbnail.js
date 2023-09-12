import React, {useState, useEffect} from "react";
import SteamApis from "../api";

export function GameThumbnail({gameId}){
    const [gameDetails, setGameDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log("working");
    useEffect(() => {
        async function getAppDetails(){
            const res = await SteamApis.getAppDetails(gameId);
            setGameDetails(res);
            console.log(res);
            setIsLoading(false);
        }
    },[])
    if(isLoading){
        return <></>
    }
    return (
        <div className="GameThumbnail">

        </div>
    )
}