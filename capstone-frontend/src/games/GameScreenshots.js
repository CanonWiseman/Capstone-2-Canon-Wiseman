import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "./GameScreenshots.css"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { v4 as uuidv4 } from 'uuid';

export function GameScreenshots({screenshots, movies}){

    
    return (
        <div className="">
            <Swiper 
            slidesPerView={1} 
            loop={true}
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}>
                
            {screenshots.map(screenshot => (
                <SwiperSlide key={uuidv4()}>
                    <img src={screenshot.path_full} alt={screenshot.id} className="screenshot"/>
                </SwiperSlide>
            ))}
            {/* {movies.map(movie => (
                <SwiperSlide key={uuidv4()}>
                    <video height="500px" width="500px" controls="controls">
                        <source src={movie.mp4.max} type="video/mp4"/>
                    </video>
                </SwiperSlide>
            ))} */}
            </Swiper>
        </div>
        
    )
}