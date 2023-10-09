import React from "react";
import "./GameDetailsTable.css";

export function GameDetailsTable({gameDetails}){
    return (
        <table className="GameDetailsTable">
            <tbody>
                <tr>
                    <td>App Id</td>
                    <td>{gameDetails.steam_appid}</td>
                </tr>
                <tr>
                    <td>App Type</td>
                    <td>{gameDetails.type}</td>
                </tr>
                {gameDetails.developers && gameDetails.developers[0] !== "" ?
                <tr>
                    <td>Developer</td>
                    <td>{gameDetails.developers.map(developer => developer).join(", ")}</td>
                </tr>
                :null}
                {gameDetails.publishers && gameDetails.publishers[0] !== "" ?
                <tr>
                    <td>Publisher</td>
                    <td>{gameDetails.publishers.map(publisher => publisher).join(", ")}</td>
                </tr>
                : null}
                
                <tr>
                    <td>Platforms</td>
                    <td>{gameDetails.platforms.windows ? "Windows" : null} {gameDetails.platforms.mac ? "Mac" : null} {gameDetails.platforms.linux ? "Linux" : null}</td>
                </tr>
                <tr>
                    <td>Release Date</td>
                    <td>{gameDetails.release_date.date !== "" ? gameDetails.release_date.date: 'N/A'}</td>
                </tr>
                {gameDetails.genres ?
                <tr>
                    <td>Genres</td>
                    <td>{gameDetails.genres.map(genre => genre.description).join(", ")}</td>
                </tr>
                : null}
                
                {gameDetails.price_overview ?
                    <tr>
                        <td>Price</td>
                        <td>{gameDetails.price_overview.final_formatted}</td>
                    </tr>
                : null
                }
                
            </tbody>
        </table>
    )
}