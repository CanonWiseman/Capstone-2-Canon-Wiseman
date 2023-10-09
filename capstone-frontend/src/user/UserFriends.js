import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';
import "./UserFriends.css";

export function UserFriends(){

    const[isLoading, setIsLoading] = useState(true);
    const [steamFriends, setSteamFriends] = useState(null);
    const [steamPlayerSummary, setSteamPlayerSummary] = useState(null);
    const params = useParams();

    useEffect(() => {
        async function getPlayerFriends(){
            setIsLoading(true);
            const playerFriends = await SteamApis.getPlayerFriends(params.id);
            const friends = playerFriends.friendslist.friends;
            const friendsIds = friends.map((friend) => friend.steamid);
            const friendSummary = await SteamApis.getPlayerSummary(friendsIds.join(","));
            setSteamFriends(friendSummary);

            const playerSummary = await SteamApis.getPlayerSummary(params.id);
            console.log(playerSummary);
            setSteamPlayerSummary(playerSummary.response.players[0]);
            setIsLoading(false);
        }
        getPlayerFriends();
    }, [params.id]);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container UserFriends">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <h4 className="UserFriends-user">{steamPlayerSummary.personaname}</h4>
                        <h5 className="UserFriends-title">Friends List</h5>
                    </div>
                    {steamFriends.response.players.map(friend => (
                        <div className="col-3 UserFriends-card" key={uuidv4()}>
                            <a href={`/users/${friend.steamid}`}>
                                <img src={friend.avatarfull} alt="Users Profile"/>
                                <p className="UserFriend-friendName">{friend.personaname}</p>
                                <p className="UserFriend-lastOnline">Last Online: {<Moment format="MM/DD/YYYY" unix>{friend.lastlogoff}</Moment>}</p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}