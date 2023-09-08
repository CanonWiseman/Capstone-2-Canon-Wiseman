import React, {useState} from "react";
import { convertToDollars } from "../helpers/currencyConverter";
import { GameThumbnail } from "./GameThumbnail";

export function GameCard({game}) {
    const [showThumbnail, setShowThumbnail] = useState(false);

    function toggleThumbnail(){
        showThumbnail === false ? setShowThumbnail(true) : setShowThumbnail(false)
    }

    return(
        <div className="GameCard" onMouseEnter={() => toggleThumbnail()} onMouseLeave={() => toggleThumbnail()}>
            {showThumbnail ? <GameThumbnail gameId={game.id}/> : null}
            <img src={game.small_capsule_image} alt={`${game.name} teaser`} />
            <p>{game.name}</p>
            <p>
                {
                    game.final_price === 0 ? "Free" : convertToDollars(game.final_price)
                }
            </p>
        </div>
    )
}