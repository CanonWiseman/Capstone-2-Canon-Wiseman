import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "./GameScreenshots.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { v4 as uuidv4 } from 'uuid';

export function GameScreenshots({screenshots, movies}){

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
      
    if(screenshots){
        return (
            <div className="col-lg-12 Screenshots">
                <h2 className="Screenshots-title">Screenshots</h2>
                <div className="">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        slidesToSlide={1}
                        showDots={true}
                        responsive={responsive}
                        keyBoardControl={true}
                        infinite={true}
                        containerClass="carousel-container-screenshots"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style carousel-item-screenshots"
                        itemClass="carousel-item-padding-40-px "
                    >
                        
                        {screenshots.map(screenshot => (
                            <div key={uuidv4()}>
                                <img src={screenshot.path_full} alt={screenshot.id} className="screenshot"/>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            
            
        )
    }
    else{
        return (
            <div>
                <p className="data-unavailable">No screenshots available</p>
            </div>
        )
    }
    
}