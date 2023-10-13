import React, {useEffect, useState} from "react";
import SteamApis from "./api";
import { Loader } from "./miscComponents/Loader";
import { GamesList } from "./games/GamesList";
import { v4 as uuidv4 } from 'uuid';
import { SteamIdForm } from "./forms/SteamIdForm";
import { UserDashboard } from "./user/UserDashboard";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./Home.css";

export function Home(){
    
    const [steamId, saveSteamId] = useLocalStorage('steamId', null);

    const [isLoading, setIsLoading] = useState(true);
    const [cats, setCats] = useState([]);

    //Grabs categories from steam api
    useEffect(() => {
        async function getCats(){
            setIsLoading(true);
            const res = await SteamApis.getFeaturedCats();
            setCats(res);
            setIsLoading(false);
        }
        getCats();
    }, [])



    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="Home container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="Home-title">Steam Sync</h2>
                    </div>

                    {steamId? 
                    <div className="col-12">
                        <UserDashboard steamId={steamId}/>
                    </div>
                    :
                    <div className="col-12 Home-logged-out">
                        <h6 className="Home-section-title">What is Steam Sync?</h6>
                        <p className="Home-section-content">Steam Sync is a companion app that scrapes data from various Steam Apis and aggregates them into one easy to access area</p>
                        <p className="Home-section-content">Data that is recieved by Steam Sync can only be changed through Steams Website or the steam app</p>
                        <p className="Home-section-content">If yours or others data does not show up it is due to privacy settings that can be changed under the steam profile settings on the steam app/website</p>
                        <p className="Home-section-content">Your Steam Id number can be found under Account Details</p>
                        <h6 className="Home-section-title">Enter Steam Id below</h6>
                        <SteamIdForm saveSteamId={saveSteamId}/>
                    </div>
                    }
                    
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <GamesList key={uuidv4()} title="Top Sellers" games={cats.top_sellers.items}/>
                    </div>
                    <div className="col-lg-12">
                        <GamesList key={uuidv4()} title="New Releases" games={cats.new_releases.items}/>
                    </div>
                    <div className="col-lg-12">
                        <GamesList key={uuidv4()} title="Specials" games={cats.specials.items}/>
                    </div>
                    <div className="col-lg-12">
                        <GamesList key={uuidv4()} title="Coming Soon" games={cats.coming_soon.items}/>
                    </div>
                </div>
            </div>
        )
    }
    
}