import React, {useEffect, useState} from "react";
import SteamApis from "./api";

export function Home(){
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getCats(){
            const res = await SteamApis.getFeaturedCats();
            setIsLoading(false);
        }
        getCats();
    }, [] )

    if(isLoading){
        return <></>
    }
    else{
        return (
            <div className="">
                
            </div>
        )
    }
    
}