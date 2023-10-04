import React from "react"
import { v4 as uuidv4 } from 'uuid';
import bbCodeParser from 'js-bbcode-parser';

export function GameNews({news}){
    console.log(news);
    if(news.length > 0){
        return (
            <div>
                {news.map(article => (
                    <div key={uuidv4()}>
                        <h4>{article.title}</h4>
                        <div dangerouslySetInnerHTML={{__html: bbCodeParser.parse(article.contents).replaceAll('{STEAM_CLAN_IMAGE}', "https://clan.akamai.steamstatic.com/images/")}}></div>
                    </div>
                ))}
            </div>     
        )
    }
    else{
        return (
            <p>No news available</p>
        )
    }
    
}