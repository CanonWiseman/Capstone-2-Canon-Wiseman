import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { UserRecentlyPlayed } from "./UserRecentlyPlayed";
import { UserBadges } from "./UserBadges";
import { UserGames } from "./UserGames";

export function UserDashboard({steamId}){

    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerLevel, setSteamPlayerLevel] = useState(null);
    const [steamPlayerSummary, setSteamPlayerSummary] = useState(null);
    const [steamPlayerWishlist, setSteamPlayerWishlist] = useState(null);

    useEffect(() => {
        async function getPlayerSummary(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerLevel = await SteamApis.getPlayerLevel(steamId);
                setSteamPlayerLevel(playerLevel.response);
                const playerSummary = await SteamApis.getPlayerSummary(steamId);
                setSteamPlayerSummary(playerSummary.response.players[0]);
                const playerWishlist = await SteamApis.getWishlist(steamId);
                setSteamPlayerWishlist(playerWishlist);
                setIsLoading(false);
          }
        }
        getPlayerSummary();
    }, [steamId]);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={steamPlayerSummary.avatarfull} alt="Users Avatar"/>
                        <h3>{steamPlayerSummary.personaname}</h3>
                    </div>
                    <div className="col-12">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Steam Id</td>
                                    <td>{steamPlayerSummary.steamid}</td>
                                </tr>
                                <tr>
                                    <td>Country Code</td>
                                    <td>{steamPlayerSummary.loccountrycode}</td>
                                </tr>
                                {steamPlayerSummary.locstatecode?
                                <tr>
                                    <td>State Code</td>
                                    <td>{steamPlayerSummary.locstatecode}</td>
                                </tr>
                                : null}
                                <tr>
                                    <td>Profile Created</td>
                                    <td><Moment format="MM/DD/YYYY" unix>{steamPlayerSummary.timecreated}</Moment></td>
                                </tr>
                                <tr>
                                    <td>Steam Level</td>
                                    <td>{steamPlayerLevel.player_level}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12">
                        <UserRecentlyPlayed steamId={steamId}/>
                    </div>
                    <div className="col-12">
                        <UserGames steamId={steamId}/>
                    </div>
                </div>
            </div>
        )
    }
}   
