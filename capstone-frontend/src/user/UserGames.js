import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { convertToHours } from "../helpers/minutesToHours";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';  
import { v4 as uuidv4 } from 'uuid'; 
import "./UserGames.css";
import  grid from "../images/iconmonstr-layout-grid-filled-48.png";
import carousel from "../images/iconmonstr-carousel-filled-48.png";

export function UserGames({steamId}){
    
    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerGames, setSteamPlayerGames] = useState(null);
    const [gamesStyle, setGamesStyle] = useState("carousel");

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 5
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 5
        }
      };

    useEffect(() => {
        async function getPlayerGames(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerGames = await SteamApis.getPlayerGames(steamId);
                if(!playerGames.response.games){
                    setSteamPlayerGames(false);
                }
                else{
                    setSteamPlayerGames(playerGames.response);
                }
                setIsLoading(false);
          }
        }
        getPlayerGames();
    }, [steamId]);

    // console.log(steamPlayerGames);
    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container UserDashboard-section UserGames">
                <div className="row d-flex justify-content-center">
                    {steamPlayerGames ?
                    <div>
                        <h2 className="Dashboard-title col-lg-12">Library</h2>
                        <div className="col-12 UserGames-view-btns">
                            <button style={{padding: "0px"}} className="btn" onClick={() => setGamesStyle("carousel")}>
                                <img className={gamesStyle === "carousel" ? "active-icon" : ""} src={carousel} alt="Carousel Icon"/>
                            </button>
                            <button style={{padding: "0px"}} className="btn" onClick={() => setGamesStyle("grid")}>
                                <img className={gamesStyle === "grid" ? "active-icon" : ""} src={grid} alt="Grid Icon"/>
                            </button>
                        </div> 
                    </div>
                    
                    : null}

                    {steamPlayerGames ?
                        gamesStyle === "carousel" ? 
                            <Carousel
                                swipeable={true}
                                draggable={true}
                                slidesToSlide={4}
                                showDots={false}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                keyBoardControl={true}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                                >
                                {steamPlayerGames.games.map(game =>(
                                    game.img_icon_url !== "" ? 
                                        <div className="UserGame-card" key={uuidv4()}>
                                            <a href={`/app/${game.appid}`}>
                                                <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                                <h6>{game.name}</h6>
                                                <p>Total Played: {convertToHours(game.playtime_forever)}</p>
                                                {game.rtime_last_played && game.rtime_last_played !== 0?
                                                    <p>Last Played: <Moment format="MM/DD/YYYY" unix>{game.rtime_last_played}</Moment></p>
                                                :null}
                                            </a>
                                        </div>
                                    : null
                                ))}
                            </Carousel>
                        : 
                        steamPlayerGames.games.map(game =>(
                            game.img_icon_url !== "" ? 
                                <div className="UserGame-card col-3" key={uuidv4()}>
                                    <a href={`/app/${game.appid}`}>
                                        <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                        <h6>{game.name}</h6>
                                        <p>Total Played: {convertToHours(game.playtime_forever)}</p>
                                        {game.rtime_last_played && game.rtime_last_played !== 0?
                                            <p>Last Played: <Moment format="MM/DD/YYYY" unix>{game.rtime_last_played}</Moment></p>
                                        :null}
                                    </a>
                                </div>
                            : null
                        ))
                    : <h4 className="data-unavailable">Library data unavailable</h4>}
                </div>
            </div>
        )
    }
}