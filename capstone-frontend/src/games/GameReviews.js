import React, {useEffect, useState} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import { v4 as uuidv4 } from 'uuid';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import "./GameReview.css";

export function GameReviews({appId}){

    const [isLoading, setIsLoading] = useState(true);
    const [gameReviews, setGameReviews] = useState(null);

    useEffect(() => {
        async function getReviews(){
            const reviews = await SteamApis.getReviews(appId);
            setGameReviews(reviews);
            setIsLoading(false);
        }
        getReviews();
    }, [appId]);

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="col-lg-12 GameReviews">
                <h2 className="GameReviews-title">Reviews</h2>
                <div className="GameReviews-body">
                    {gameReviews.query_summary.total_reviews > 0 ?
                    gameReviews.reviews.map(review => (
                        <div className="GameReviews-card" key={uuidv4()}>
                            <div>
                            <p className="GameReviews-content" dangerouslySetInnerHTML={{__html: review.review}}></p>

                            {review.voted_up 
                                ? 
                                <i dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" class="filter-green" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.698 15.354c-.405-.031-.367-.406.016-.477.634-.117.913-.457.913-.771 0-.265-.198-.511-.549-.591-.418-.095-.332-.379.016-.406.566-.045.844-.382.844-.705 0-.282-.212-.554-.63-.61-.429-.057-.289-.367.016-.461.261-.08.677-.25.677-.755 0-.336-.25-.781-1.136-.745-.614.025-1.833-.099-2.489-.442.452-1.829.343-4.391-.845-4.391-.797 0-.948.903-1.188 1.734-.859 2.985-2.577 3.532-4.343 3.802v4.964c3.344 0 4.25 1.5 6.752 1.5 1.6 0 2.426-.867 2.426-1.333 0-.167-.136-.286-.48-.313z"/></svg>'}}></i> 
                                :
                                <i dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" class="filter-red" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.178 8.333c0-.466-.826-1.333-2.426-1.333-2.502 0-3.408 1.5-6.752 1.5v4.964c1.766.271 3.484.817 4.344 3.802.239.831.39 1.734 1.187 1.734 1.188 0 1.297-2.562.844-4.391.656-.344 1.875-.468 2.489-.442.886.036 1.136-.409 1.136-.745 0-.505-.416-.675-.677-.755-.305-.094-.444-.404-.016-.461.418-.056.63-.328.63-.61 0-.323-.277-.66-.844-.705-.348-.027-.434-.312-.016-.406.351-.08.549-.326.549-.591 0-.314-.279-.654-.913-.771-.383-.07-.421-.445-.016-.477.345-.027.481-.146.481-.313z"/></svg>'}}></i>
                            }

                            <p className="GameReviews-date">Posted on: {<Moment format="MM/DD/YYYY" unix>{review.timestamp_created}</Moment>}</p>
                            <Link to={`/users/${review.author.steamid}`}>
                                <i dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" class="filter-white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>'}}></i>
                            </Link>
                            </div>
                            
                        </div>
                    ))
                    :<div>
                        <h5 className="data-unavailable">No Reviews Available</h5>
                    </div>}
                </div>
                
            </div>
        )
    }
    
}