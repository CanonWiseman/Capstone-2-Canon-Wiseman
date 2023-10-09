import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { UserDashboard } from "./UserDashboard";

export function UserProfile(){

    const[isLoading, setIsLoading] = useState(true);
    const [steamProfile, setSteamProfile] = useState(null);
    const params = useParams();

    useEffect(() => {
        async function getPlayerProfile(){
            setIsLoading(true);
            const playerSummary = await SteamApis.getPlayerSummary(params.id);
            setSteamProfile(playerSummary);
            setIsLoading(false);
        }
        getPlayerProfile();
    }, []);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <UserDashboard steamId={params.id}/>
        )
    }
}