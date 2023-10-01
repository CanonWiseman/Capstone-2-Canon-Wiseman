import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { v4 as uuidv4 } from 'uuid';
import { convertToHours } from "../helpers/minutesToHours";

export function UserRecentlyPlayed({steamId}){

    const [isLoading, setIsLoading] = useState(true);
    const [steamPlayerRecentlyPlayed, setSteamPlayerRecentlyPlayed] = useState(null);

    useEffect(() => {
        async function getPlayerRecentlyPlayed(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerRecentlyPlayed = await SteamApis.getPlayerRecentlyPlayed(steamId);
                setSteamPlayerRecentlyPlayed(playerRecentlyPlayed.response);
                setIsLoading(false);
          }
        }
        getPlayerRecentlyPlayed();
    }, [steamId]);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container">
                <div className="row">
                    <h6>Recently Played</h6>
                    {steamPlayerRecentlyPlayed.games.map(game => (
                        <div className="col-3" key={uuidv4()}>
                            <a href={`/app/${game.appid}`}>
                                <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                <h6>{game.name}</h6>
                                <p>Total Played: {convertToHours(game.playtime_forever)}</p>
                                <p>Played Recently: {convertToHours(game.playtime_2weeks)}</p>
                            </a>
                        </div>
                    ))}
                </div>
                
            </div>
        )
    }
    
}