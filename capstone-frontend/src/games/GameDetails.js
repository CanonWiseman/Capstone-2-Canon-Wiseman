import React, {useEffect, useState} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { useParams } from "react-router-dom";
import {formatNumber} from "../helpers/numberFormatter";
import { GameScreenshots } from "./GameScreenshots";
import { GameDetailsTable } from "./GameDetailsTable";
import { GameNews } from "./GameNews";
import { GameAchievements } from "./GameAchievments";

export function GameDetails(){
    const [isLoading, setIsLoading] = useState(true);
    const [gameDetails, setGameDetails] = useState(null);
    const [playerCount, setPlayerCount] = useState(null);
    const [gameSchema, setGameSchema] = useState(null);
    // const [steamSpyTags, setSteamSpyTags] = useState(null);
    const [gameNews, setGameNews] = useState(null);

    const params = useParams();
    
    useEffect(() => {
        async function getDetails(){
            const res = await SteamApis.getAppDetails(params.id);
            setGameDetails(res[`${params.id}`].data);
            const res2 = await SteamApis.getPlayerCount(params.id);
            // const res3 = await SteamApis.getSteamSpyDetails(params.id);
            const res3 = await SteamApis.getAppNews(params.id);
            const res4 = await SteamApis.getGameSchema(params.id);
            setGameNews(res3.appnews.newsitems);
            setGameSchema(res4);
            // setSteamSpyTags(res3.tags);
            setPlayerCount(res2.response.player_count);
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
                        <GameDetailsTable gameDetails={gameDetails}/>
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
                        {playerCount > 0 ?
                            <div>
                                <p>{formatNumber(playerCount)}</p>
                                <p>in game</p>
                            </div> 
                            : null 
                        }
                        {gameDetails.categories && gameDetails.categories.length > 0 ? 
                            <div>
                                <p>Categories</p>
                                {gameDetails.categories.map(cat => (cat.description)).join(", ")}
                            </div>
                        : null}
                        {gameDetails.short_description ?
                            <div>
                                <p>{gameDetails.short_description}</p>
                            </div>
                        : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Screenshots</h2>
                        <GameScreenshots screenshots={gameDetails.screenshots} movies={gameDetails.movies}/>
                    </div>
                    <div className="col-lg-12">
                        <h2>News</h2>
                        <GameNews news={gameNews}/>
                    </div>
                    <div className="col-lg-12">
                        <h2>Achievements</h2>
                        <GameAchievements schema={gameSchema}/>
                    </div>
                </div>
            </div>
        )
    }
};