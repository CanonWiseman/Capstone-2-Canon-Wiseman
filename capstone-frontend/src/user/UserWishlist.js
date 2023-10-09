import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocalStorage } from "@uidotdev/usehooks";
import { UserNews } from "./UserNews";
import "./UserWishlist.css";

export function UserWishlist({steamId}){

    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerWishlist, setSteamPlayerWishlist] = useState(null);
    const [steamApiErr, setSteamApiErr] = useState(false);
    const [userId] = useLocalStorage('steamId');
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
        async function getPlayerWishlist(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                try{
                    const playerWishlist = await SteamApis.getWishlist(steamId);
                    setSteamPlayerWishlist(playerWishlist);
                    if(userId === steamId){
                        let articles = [];
                        let _playerWishlist = Object.entries(playerWishlist);
                        articles.push({appId: _playerWishlist[0][0], appName: _playerWishlist[0][1].name})
                        setArticleIds(articles);
                    }
                    setIsLoading(false);
                }
                catch(err){
                    setSteamApiErr(true);
                    setIsLoading(false);
                }
            }
        }
        getPlayerWishlist();
    }, [steamId]);


    if(isLoading){
        return <Loader/>
    }
    else{
        return(
            <div className="container UserDashboard-section">
                <div className="row">
                    {!steamApiErr ? 
                    
                    <div>
                        <h2 className="UserWishlist-title">Wishlist</h2>
                    
                        <Carousel
                        swipeable={true}
                        draggable={true}
                        slidesToSlide={1}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        keyBoardControl={true}
                        containerClass="carousel-container-wishlist"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px carousel-item-wishlist"
                        partialVisible={false}
                        afterChange={(previousSlide, {currentSlide}) => {
                            let articles = [];
                            let _playerWishlist = Object.entries(steamPlayerWishlist);
                            articles.push({appId: _playerWishlist[currentSlide][0], appName: _playerWishlist[currentSlide][1].name})
                            setArticleIds(articles);
                          }}
                        >

                        {Object.keys(steamPlayerWishlist).map(appId =>(
                        <div key={uuidv4()} className="Wishlist-gamecard">
                            <a className="Wishlist-gamecard-link" href={`/app/${appId}`}>
                                <img src={steamPlayerWishlist[appId].capsule} alt="game thumbnail"/>
                                <h6 className="Wishlist-title">{steamPlayerWishlist[appId].name}</h6>
                                <p className="Wishlist-date-added">Date Added: <Moment format="MM/DD/YYYY" unix>{steamPlayerWishlist[appId].added}</Moment></p>
                                <p className="Wishlist-date-released">Release Date: {steamPlayerWishlist[appId].release_string}</p>
                            </a>
                        </div>
                        ))}

                        </Carousel>
                        
                        
                        {articleIds.length > 0 && steamId === userId? 
                            <UserNews appIds={articleIds} title={"Wishlist"} numArticles={20}/>
                        : null}
                        </div>
                        
                        : <h5 className="data-unavailable">WishList Data unavailable</h5>}
                    
                    </div>
            </div>
        )
    }
}