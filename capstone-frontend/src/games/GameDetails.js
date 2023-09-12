import React, {useEffect, useState} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { useParams } from "react-router-dom";

export function GameDetails(){
    const [isLoading, setIsLoading] = useState(true);
    const [gameDetails, setGameDetails] = useState(null);
    const params = useParams();
    
    useEffect(() => {
        async function getDetails(){
            const res = await SteamApis.getAppDetails(params.id);
            console.log(res[`${params.id}`].data);
            setGameDetails(res[`${params.id}`].data);
            setIsLoading(false);
        }
        getDetails();
    }, [])

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="GameDetails">
                
            </div>
        )
    }
};