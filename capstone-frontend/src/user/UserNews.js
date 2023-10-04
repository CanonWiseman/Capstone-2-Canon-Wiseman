import React, {useState, useEffect} from "react";
import { Loader } from "../miscComponents/Loader";
import SteamApis from "../api";
import Moment from 'react-moment';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import bbCodeParser from 'js-bbcode-parser';
import "./UserNews.css";

export function UserNews({appIds, title, numArticles}){
    
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function getNewsArticles(){
            setIsLoading(true);
            let allArticles = [];
            for(let app of appIds){
                let article = await SteamApis.getAppNews(app.appId);
                if(article.appnews.newsitems.length > numArticles){
                    article.appnews.newsitems.length = numArticles;
                }
                for(let item of article.appnews.newsitems){
                    item["appName"] = app.appName;
                    allArticles.push(item);
                }
            }
            setArticles(allArticles);
            setIsLoading(false);
        }
        getNewsArticles();
    }, []);

    function Item({article})
    {
        return (
            <Paper>
                <h2>{article.appName}</h2>
                <h2>{article.title}</h2>
                <p>Author: {article.author}</p>
                <p>Posted: {<Moment format="MM/DD/YYYY" unix>{article.date}</Moment>}</p>
                <p>Feed: {article.feedlabel}</p>
                <div className="article-content" dangerouslySetInnerHTML={{__html: bbCodeParser.parse(article.contents).replaceAll('{STEAM_CLAN_IMAGE}', "https://clan.akamai.steamstatic.com/images/")}}></div>
            </Paper>
        )
    }

    if(isLoading){
        return <Loader/>
    }
    else{
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h4>{title} News</h4>
                    </div>
                    <div className="col-12 mt-3">
                    <Carousel autoPlay={false} swipe={false} navButtonsAlwaysVisible={true} navButtonsWrapperProps={{className:"NavBtns"}}>
                        {
                            articles.map((article, i) => <Item key={i} article={article}/>)
                        }
                    </Carousel>
                    </div>
                </div>
            </div>
        )
    }
}