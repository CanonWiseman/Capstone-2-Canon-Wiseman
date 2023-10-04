import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { convertToHours } from "../helpers/minutesToHours";
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocalStorage } from "@uidotdev/usehooks";
import { UserNews } from "./UserNews";

export function UserRecentlyPlayed({steamId}){

    const [isLoading, setIsLoading] = useState(true);
    const [steamPlayerRecentlyPlayed, setSteamPlayerRecentlyPlayed] = useState(null);
    const [userId] = useLocalStorage('steamId', null);
    const [articleIds, setArticleIds] = useState([]);

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 3
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3
        }
      };


    useEffect(() => {
        async function getPlayerRecentlyPlayed(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerRecentlyPlayed = await SteamApis.getPlayerRecentlyPlayed(steamId);
                setSteamPlayerRecentlyPlayed(playerRecentlyPlayed.response);
                if(userId === steamId){
                    let articles = [];
                    for(let game of playerRecentlyPlayed.response.games){
                        articles.push({appId:game.appid, appName: game.name});
                    }
                    setArticleIds(articles);
                }
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
                    
                    {steamPlayerRecentlyPlayed.total_count ? 
                        <div>
                            <h2>Recently Played</h2>
                            <Carousel
                            swipeable={true}
                            draggable={true}
                            slidesToSlide={1}
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

                            {articleIds.length > 0 ? 
                                <UserNews appIds={articleIds} title={"Recently Played"} numArticles={4}/>
                            : null}
                                </div>
                        
                            : <div className="col-12"><h5>Recently played Data unavailable</h5></div>}

                </div>
            </div>
        )
    }
    
}