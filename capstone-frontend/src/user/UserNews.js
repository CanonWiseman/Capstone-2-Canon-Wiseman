import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import { convertToHours } from "../helpers/minutesToHours";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';  
import { v4 as uuidv4 } from 'uuid'; 

export function UserNews({appIds}){
    
    const [isLoading, setIsLoading] = useState(true);


    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <></>
        )
    }
}