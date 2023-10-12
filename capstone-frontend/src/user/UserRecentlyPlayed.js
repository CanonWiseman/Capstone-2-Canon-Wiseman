import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { convertToHours } from "../helpers/minutesToHours";
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocalStorage } from "@uidotdev/usehooks";
import { UserNews } from "./UserNews";
import "./UserRecentlyPlayed.css";

export function UserRecentlyPlayed({steamId}){

    const [isLoading, setIsLoading] = useState(true);
    const [steamPlayerRecentlyPlayed, setSteamPlayerRecentlyPlayed] = useState(null);
    const [userId, setUserId] = useLocalStorage('steamId', null);
    const [articleIds, setArticleIds] = useState([]);

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    useEffect(() => {
        async function getPlayerRecentlyPlayed(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                const playerRecentlyPlayed = await SteamApis.getPlayerRecentlyPlayed(steamId);
                setSteamPlayerRecentlyPlayed(playerRecentlyPlayed.response);
                if(userId === steamId && playerRecentlyPlayed.response.total_count > 0){
                    let articles = [];
                    articles.push({appId:playerRecentlyPlayed.response.games[0].appid, appName: playerRecentlyPlayed.response.games[0].name});
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
            <div className="container UserDashboard-section">
                <div className="row">
                    
                    {steamPlayerRecentlyPlayed.total_count ? 
                        <div>
                            <h2 className="Dashboard-title">Recently Played</h2>
                            <Carousel
                            swipeable={true}
                            draggable={true}
                            slidesToSlide={1}
                            showDots={true}
                            responsive={responsive}
                            keyBoardControl={true}
                            infinite={false}
                            containerClass="carousel-container-recently-played"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px carousel-item-recently-played"
                            afterChange={(previousSlide, {currentSlide}) => {
                                let articles = [];
                                articles.push({appId:steamPlayerRecentlyPlayed.games[currentSlide].appid, appName: steamPlayerRecentlyPlayed.games[currentSlide].name});
                                setArticleIds(articles);
                              }}
                            >
                            
                            {steamPlayerRecentlyPlayed.games.map(game => (
                                <div key={uuidv4()} className="RecentlyPlayed-gamecard" >
                                    <a className="RecentlyPlayed-gamecard-link" href={`/app/${game.appid}`}>
                                            <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="game thumbnail"/>
                                            <h6 className="recently-played-title">{game.name}</h6>
                                            <p className="recently-played-total">Total Played: {convertToHours(game.playtime_forever)}</p>
                                            <p>Played Recently: {convertToHours(game.playtime_2weeks)}</p>
                                        </a>
                                </div>
                            ))}

                            </Carousel>

                            {articleIds.length > 0 && steamId === userId? 
                                <UserNews appIds={articleIds} title={"Recently Played"} numArticles={20}/>
                            : null}
                                </div>
                        
                            : <div className="col-12"><h5 className="data-unavailable">Recently played Data unavailable</h5></div>}

                </div>
            </div>
        )
    }
    
}