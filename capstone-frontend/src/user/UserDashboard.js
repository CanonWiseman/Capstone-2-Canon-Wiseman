import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { UserRecentlyPlayed } from "./UserRecentlyPlayed";
import { UserGames } from "./UserGames";
import { UserWishlist } from "./UserWishlist";


export function UserDashboard({steamId, isUser}){

    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerLevel, setSteamPlayerLevel] = useState(null);
    const [steamPlayerSummary, setSteamPlayerSummary] = useState(null);
    const [steamFriends, setSteamFriends] = useState(null);

    useEffect(() => {
        async function getPlayerSummary(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerLevel = await SteamApis.getPlayerLevel(steamId);
                setSteamPlayerLevel(playerLevel.response);
                const playerSummary = await SteamApis.getPlayerSummary(steamId);
                setSteamPlayerSummary(playerSummary.response.players[0]);
                try{
                    const playerFriends = await SteamApis.getPlayerFriends(steamId);
                    setSteamFriends(playerFriends);
                }
                catch(err){
                    setSteamFriends(false);
                }
                setIsLoading(false);
          }
        }
        getPlayerSummary();
    }, [steamId]);

    // console.log(steamPlayerSummary);
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
                                    {steamPlayerSummary.loccountrycode ? 
                                    <tr>
                                        <td>Country Code</td>
                                        <td>{steamPlayerSummary.loccountrycode}</td>
                                    </tr>
                                    :null}
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
                                <tr>
                                    <td>Friends</td>
                                    <td>
                                        {steamFriends ? 
                                            <a href={`/users/${steamId}/friends`}>{steamFriends.friendslist.friends.length}</a>
                                        : "N/A"}
                                        
                                    </td>
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
                    <div className="col-12">
                        <UserWishlist steamId={steamId}/>
                    </div>
                </div>
            </div>
        )
    }
}   
