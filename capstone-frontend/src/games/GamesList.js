import React from "react";
import { GameCard } from "./GameCard";
import { v4 as uuidv4 } from 'uuid';

export function GamesList({title, games}){
    return (
        <div className="GamesList">
            <h3 className="GamesList-Title">{title}</h3>
            {games.map(game =>(
                <GameCard key={uuidv4()} game={game}/>
            ))}
        </div>
    )
}