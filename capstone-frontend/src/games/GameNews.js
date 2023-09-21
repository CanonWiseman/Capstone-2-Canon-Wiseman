import React from "react"
import { v4 as uuidv4 } from 'uuid';

export function GameNews({news}){
    if(news.length > 0){
        return (
            <div>
                {news.map(article => (
                    <div key={uuidv4()}>
                        <h4>{article.title}</h4>
                        <div dangerouslySetInnerHTML={{__html: article.contents}}></div>
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