import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { convertToHours } from "../helpers/minutesToHours";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';  
import { v4 as uuidv4 } from 'uuid'; 
import { useLocalStorage } from "@uidotdev/usehooks";

export function UserGames({steamId}){
    
    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerGames, setSteamPlayerGames] = useState(null);
    const [userId] = useLocalStorage('steamId', null);

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
                setSteamPlayerGames(playerGames.response);
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
            <div className="container">
                <div className="row">
                    <h2>Library</h2>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        slidesToSlide={4}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {steamPlayerGames.games.map(game =>(
                            game.img_icon_url !== "" ? 
                                <div key={uuidv4()}>
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
                </div>
            </div>
        )
    }
}