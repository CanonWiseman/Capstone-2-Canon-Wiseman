import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocalStorage } from "@uidotdev/usehooks";
import { UserNews } from "./UserNews";

export function UserWishlist({steamId}){

    const[isLoading, setIsLoading] = useState(true);
    const [steamPlayerWishlist, setSteamPlayerWishlist] = useState(null);
    const [steamApiErr, setSteamApiErr] = useState(false);
    const [userId] = useLocalStorage('steamId');
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
        async function getPlayerWishlist(){
            if(steamId && steamId !== null){
                setIsLoading(true);
                try{
                    const playerWishlist = await SteamApis.getWishlist(steamId);
                    setSteamPlayerWishlist(playerWishlist);
                    if(userId === steamId){
                        console.log("working");
                        let articles = [];
                        for (let [k, v] of Object.entries(playerWishlist)) {
                            articles.push({appId: k, appName: v.name});
                        }
                        console.log("done");
                        setArticleIds(articles);
                    }
                    setIsLoading(false);
                }
                catch(err){
                    console.log("caught");
                    setSteamApiErr(true);
                    setIsLoading(false);
                }
            }
        }
        getPlayerWishlist();
    }, []);

    if(isLoading){
        return <Loader/>
    }
    else{
        return(
            <div className="container">
                <div className="row">
                    {!steamApiErr ? 
                    
                    <div>
                        <h5>Wishlist</h5>
                    
                        <Carousel
                        swipeable={true}
                        draggable={true}
                        slidesToSlide={3}
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
                        partialVisible={false}
                        >

                        {Object.keys(steamPlayerWishlist).map(appId =>(
                        <div key={uuidv4()}>
                            <a href={`/app/${appId}`}>
                                <img src={steamPlayerWishlist[appId].capsule} alt="game thumbnail"/>
                                <h6>{steamPlayerWishlist[appId].name}</h6>
                                <p>Date Added: <Moment format="MM/DD/YYYY" unix>{steamPlayerWishlist[appId].added}</Moment></p>
                                <p>Release Date: {steamPlayerWishlist[appId].release_string}</p>
                            </a>
                        </div>
                        ))}

                        </Carousel>
                        
                        
                        {articleIds.length > 0 ? 
                            <UserNews appIds={articleIds} title={"Wishlist"} numArticles={4}/>
                        : null}
                        </div>
                        
                        : <h5>WishList Data unavailable</h5>}
                    
                    </div>
            </div>
        )
    }
}