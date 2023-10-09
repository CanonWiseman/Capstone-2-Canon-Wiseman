import React, {useEffect, useState} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { useParams } from "react-router-dom";
import {formatNumber} from "../helpers/numberFormatter";
import { GameScreenshots } from "./GameScreenshots";
import { GameDetailsTable } from "./GameDetailsTable";
import { GameAchievements } from "./GameAchievments";
import { UserNews } from "../user/UserNews";
import { GameReviews } from "./GameReviews";
import "./GameDetails.css";
import { useNavigate} from "react-router-dom";
import { GameMovies } from "./GameMovies";

export function GameDetails(){
    const [isLoading, setIsLoading] = useState(true);
    const [gameDetails, setGameDetails] = useState(null);
    const [playerCount, setPlayerCount] = useState(null);
    const [gameSchema, setGameSchema] = useState(null);

    const params = useParams();
    let navigate = useNavigate();
    
    useEffect(() => {
        async function getDetails(){
            const details = await SteamApis.getAppDetails(params.id);
            setGameDetails(details[`${params.id}`].data);
            const userCount = await SteamApis.getPlayerCount(params.id);
            setPlayerCount(userCount.response.player_count);
            const achievments = await SteamApis.getGameSchema(params.id);
            setGameSchema(achievments);
            setIsLoading(false);
        }
        getDetails();
    }, [params.id])

    if(isLoading){
        return <Loader/>
    }
    else if(!gameDetails){
        return(
            <div className="GameDetails container" style={{height: "100vh"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="data-unavailable">Data for this game is unavailable</h2>
                        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="GameDetails container">
                <div className="row">
                    <div className="col-lg-8 d-flex align-items-center flex-column">
                        <h2 className="GameDetailsGameTitle">{gameDetails.name}</h2>
                        <GameDetailsTable gameDetails={gameDetails}/>
                    </div>
                    <div className="col-lg-4 d-flex align-items-center flex-column GameDetails-tags">
                        <img src={gameDetails.capsule_image} alt={gameDetails.name}></img>
                        {gameDetails.metacritic ?
                            <div>
                                <a href={gameDetails.metacritic.url}>
                                    <p className="GameDetails-tag-title">Metacritic score: {gameDetails.metacritic.score}</p>
                                </a>
                            </div> 
                            : null 
                        }
                        {playerCount > 0 ?
                            <div>
                                <p className="GameDetails-tag-title">{formatNumber(playerCount)} Player(s) in game</p>
                            </div> 
                            : null 
                        }
                        {gameDetails.categories && gameDetails.categories.length > 0 ? 
                            <div>
                                <p className="GameDetails-tag-title">Categories</p>
                                {gameDetails.categories.map(cat => (cat.description)).join(", ")}
                            </div>
                        : null}
                        {gameDetails.short_description ?
                            <div>
                                <p className="GameDetails-tag-title">Description</p>
                                <p>{gameDetails.short_description}</p>
                            </div>
                        : null}
                    </div>
                </div>
                <div className="row">
                    <GameScreenshots screenshots={gameDetails.screenshots}/>
                    <GameMovies movies={gameDetails.movies}/>
                    <UserNews appIds={[{appId: params.id, appName: gameDetails.name}]} title="" numArticles={100}/>
                    <GameAchievements schema={gameSchema}/>
                    <GameReviews appId={params.id}/>
                </div>
            </div>
        )
    }
};