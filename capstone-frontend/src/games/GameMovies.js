import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';
import "./GameMovies.css";

export function GameMovies({movies}){
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

      if(movies){
        return(
            <div className="col-lg-12 Movies">
                <h2 className="Movies-title">Movies</h2>
                <div className="">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        slidesToSlide={1}
                        showDots={true}
                        responsive={responsive}
                        keyBoardControl={true}
                        infinite={false}
                        containerClass="carousel-container-movies"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style carousel-item-screenshots"
                        itemClass="carousel-item-padding-40-px "
                    >
                        
                        {movies.map(movie => (
                            <div key={uuidv4()}>
                                <video className="Movies-container" width="auto" height="auto" max-height="500" max-width="500" controls="controls" preload="metadata">
                                    <source src={`${movie.mp4["480"]}#t=1`} type="video/mp4" />
                                </video>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        )
      }
      else{
        return (
            <div className="col-lg-12 Movies">
                <h2 className="Movies-title">Movies</h2>
                <p className="data-unavailable">No movies available</p>
            </div>
        )
    }
}