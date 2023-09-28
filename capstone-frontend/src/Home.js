import React, {useEffect, useState} from "react";
import SteamApis from "./api";
import { Loader } from "./miscComponents/Loader";
import { GamesList } from "./games/GamesList";
import { v4 as uuidv4 } from 'uuid';

export function Home(){
    
    const [isLoading, setIsLoading] = useState(true);
    const [cats, setCats] = useState([]);

    //Grabs categories from steam api
    useEffect(() => {
        async function getCats(){
            const res = await SteamApis.getFeaturedCats();
            //cuts new releases items length from 30 to 10
            res.new_releases.items.length = 10
            console.log(res);
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
                    <div className="col-lg-6">
                        <GamesList key={uuidv4()} title="Top Sellers" games={cats.top_sellers.items}/>
                    </div>
                    <div className="col-lg-6">
                        <GamesList key={uuidv4()} title="New Releases" games={cats.new_releases.items}/>
                    </div>
                    <div className="col-lg-6">
                        <GamesList key={uuidv4()} title="Specials" games={cats.specials.items}/>
                    </div>
                    <div className="col-lg-6">
                        <GamesList key={uuidv4()} title="Coming Soon" games={cats.coming_soon.items}/>
                    </div>
                </div>
            </div>
        )
    }
    
}