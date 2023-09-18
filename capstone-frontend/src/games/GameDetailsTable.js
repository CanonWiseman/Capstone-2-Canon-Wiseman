import React from "react";

export function GameDetailsTable({gameDetails}){
    return (
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
                <tr>
                    <td>Genres</td>
                    <td>{gameDetails.genres.map(genre => genre.description).join(", ")}</td>
                </tr>
                {gameDetails.price ?
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