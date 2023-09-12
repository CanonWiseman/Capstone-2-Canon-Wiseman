import React from "react";
import { GameCard } from "./GameCard";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

export function GamesList({title, games}){
    return (
        <div className="GamesList">
            <h3 className="GamesList-Title">{title}</h3>
            {games.map(game =>(
                <Link to={`/app/${game.id}`}>
                    <GameCard key={uuidv4()} game={game}/>
                </Link>
            ))}
        </div>
    )
}