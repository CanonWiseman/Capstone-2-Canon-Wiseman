import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import { useLocalStorage } from "@uidotdev/usehooks";

export function Logout(){
    const navigate = useNavigate();
    const [steamId, saveSteamId] = useLocalStorage('steamId');

    useEffect(() =>{
        saveSteamId(null);
        navigate('/');
    })
    
}