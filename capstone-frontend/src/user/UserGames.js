import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';
import { convertToHours } from "../helpers/minutesToHours";

export function UserGames({steamId}){
    
    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerGames, setSteamPlayerGames] = useState(null);

    useEffect(() => {
        async function getPlayerGames(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerGames = await SteamApis.getPlayerGames(steamId);
                setSteamPlayerGames(playerGames.response);
                setIsLoading(false);
          }
        }
        getPlayerGames();
    }, [steamId]);

    console.log(steamPlayerGames);
    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container">
                <div className="row">
                    <h6>Library</h6>
                    {steamPlayerGames.games.map(game => (
                        <div className="col-3">
                            <a href={`/app/${game.appid}`} key={uuidv4()}>
                                <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                <h6>{game.name}</h6>
                                <p>Total Played: {convertToHours(game.playtime_forever)}</p>
                                {game.rtime_last_played !== 0?
                                    <p>Last Played: <Moment format="MM/DD/YYYY" unix>{game.rtime_last_played}</Moment></p>
                                :null}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}