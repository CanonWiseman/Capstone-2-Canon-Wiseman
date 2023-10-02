import React from "react";
import { GameCard } from "./GameCard";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function GamesList({title, games}){

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 5
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 5
        }
      };

    return (
        <div className="GamesList">
            <h3 className="GamesList-Title">{title}</h3>
            <Carousel
            swipeable={true}
            draggable={true}
            slidesToSlide={5}
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
            >
                
                {games.map(game =>(
                    <Link key={uuidv4()} to={`/app/${game.id}`}>
                        <GameCard game={game}/>
                    </Link>
                ))}

            </Carousel>
            
        </div>
    )
}