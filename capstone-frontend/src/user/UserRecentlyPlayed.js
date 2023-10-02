import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { convertToHours } from "../helpers/minutesToHours";
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';   

export function UserRecentlyPlayed({steamId}){

    const [isLoading, setIsLoading] = useState(true);
    const [steamPlayerRecentlyPlayed, setSteamPlayerRecentlyPlayed] = useState(null);

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 2
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };

    useEffect(() => {
        async function getPlayerRecentlyPlayed(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerRecentlyPlayed = await SteamApis.getPlayerRecentlyPlayed(steamId);
                setSteamPlayerRecentlyPlayed(playerRecentlyPlayed.response);
                setIsLoading(false);
          }
        }
        getPlayerRecentlyPlayed();
    }, [steamId]);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container">
                <div className="row">
                    <h6>Recently Played</h6>
                    {steamPlayerRecentlyPlayed.total_count ? 
                        <Carousel
                        swipeable={true}
                        draggable={true}
                        slidesToSlide={2}
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

                        {steamPlayerRecentlyPlayed.games.map(game => (
                            <div key={uuidv4()}>
                                <a href={`/app/${game.appid}`}>
                                        <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                        <h6>{game.name}</h6>
                                        <p>Total Played: {convertToHours(game.playtime_forever)}</p>
                                        <p>Played Recently: {convertToHours(game.playtime_2weeks)}</p>
                                    </a>
                            </div>
                        ))}

                        </Carousel>
                    : <div className="col-12"><h6>Data unavailable</h6></div>}
                    {/* {steamPlayerRecentlyPlayed.total_count ? 
                        steamPlayerRecentlyPlayed.games.map(game => (
                            <div className="col-3" key={uuidv4()}>
                                <a href={`/app/${game.appid}`}>
                                    <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                    <h6>{game.name}</h6>
                                    <p>Total Played: {convertToHours(game.playtime_forever)}</p>
                                    <p>Played Recently: {convertToHours(game.playtime_2weeks)}</p>
                                </a>
                            </div>
                        ))
                    : <div className="col-12"><h6>N/A</h6></div>} */}
                </div>
                
            </div>
        )
    }
    
}