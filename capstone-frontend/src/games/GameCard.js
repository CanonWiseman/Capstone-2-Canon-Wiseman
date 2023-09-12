import React, {useState} from "react";
import { convertToDollars } from "../helpers/currencyConverter";
import { GameThumbnail } from "./GameThumbnail";
import { useHover } from "@uidotdev/usehooks";

export function GameCard({game}) {
    const [showThumbnail, setShowThumbnail] = useState(false);
    const [ref, hovering] = useHover();

    
    return(
        <div className="GameCard" ref={ref} >
            <img src={game.small_capsule_image} alt={`${game.name} teaser`} />
            <p>{game.name}</p>
            <p>
                {
                    game.final_price === 0 ? "Free" : convertToDollars(game.final_price)
                }
            </p>
            {/* {
            hovering
            ? <GameThumbnail/>
            :null
            } */}
        </div>  
    )
}