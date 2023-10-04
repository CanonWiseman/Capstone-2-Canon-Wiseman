import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';

export function UserFriends(){

    const[isLoading, setIsLoading] = useState(true);
    const [steamFriends, setSteamFriends] = useState(null);
    const params = useParams();

    useEffect(() => {
        async function getPlayerFriends(){
            setIsLoading(true);
            const playerFriends = await SteamApis.getPlayerFriends(params.id);
            const friends = playerFriends.friendslist.friends;
            const friendsIds = friends.map((friend) => friend.steamid);
            const friendSummary = await SteamApis.getPlayerSummary(friendsIds.join(","));
            setSteamFriends(friendSummary);
            setIsLoading(false);
        }
        getPlayerFriends();
    }, []);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5>Friends List</h5>
                    </div>
                    {steamFriends.response.players.map(friend => (
                        <div className="col-3" key={uuidv4()}>
                            <a href={`/users/${friend.steamid}`}>
                                <img src={friend.avatarfull} alt="Users Profile"/>
                                <p>{friend.personaname}</p>
                                <p>Last Online: {<Moment format="MM/DD/YYYY" unix>{friend.lastlogoff}</Moment>}</p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}