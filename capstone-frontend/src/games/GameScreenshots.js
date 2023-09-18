import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { v4 as uuidv4 } from 'uuid';

export function GameScreenshots({screenshots, movies}){
    return (
        <Swiper slidesPerView={1} loop={true}>
            {screenshots.map(screenshot => (
                <SwiperSlide key={uuidv4()}>
                    <img src={screenshot.path_full} alt={screenshot.id}/>
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
    )
}