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
            setGameDetails(res[`${params.id}`].data);
            console.log(res[`${params.id}`].data);
            setIsLoading(false);
            
        }
        getDetails();
    }, [])

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="GameDetails container">
                <div className="row">
                    <div className="col-lg-8">
                        <h2 className="GameDetailsGameTitle">{gameDetails.name}</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>App Id</td>
                                    <td>{gameDetails.steam_appid}</td>
                                </tr>
                                <tr>
                                    <td>App Type</td>
                                    <td>{gameDetails.type}</td>
                                </tr>
                                <tr>
                                    <td>Developer</td>
                                    <td>{gameDetails.developers.map(developer => developer).join(", ")}</td>
                                </tr>
                                <tr>
                                    <td>Publisher</td>
                                    <td>{gameDetails.publishers.map(publisher => publisher).join(", ")}</td>
                                </tr>
                                <tr>
                                    <td>Platforms</td>
                                    <td>{gameDetails.platforms.windows ? "Windows" : null} {gameDetails.platforms.mac ? "Mac" : null} {gameDetails.platforms.linux ? "Linux" : null}</td>
                                </tr>
                                <tr>
                                    <td>Release Date</td>
                                    <td>{gameDetails.release_date.date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <img src={gameDetails.capsule_image} alt={gameDetails.name}></img>
                        {gameDetails.metacritic ?
                            <div>
                                <a href={gameDetails.metacritic.url}>
                                    <p>Metacritic score</p>
                                    <p>{gameDetails.metacritic.score}</p>
                                </a>
                            </div> 
                            : null 
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
};