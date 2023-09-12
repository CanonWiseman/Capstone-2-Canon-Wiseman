
const express = require("express");
const axios = require('axios');
const {steamStoreDataKey, steamApiKey} = require('../secret');
const router = new express.Router();


//Routes for Steam Spy API
//link to Steam Spy API page https://steamspy.com/api.php

const SteamSpyUrl = 'https://steamspy.com/api.php';
// Returns Top 100 games for the past 2 weeks.
router.get("/top100twoWeeks", async function(req, res, next){
    try{
        const response = await axios({
            method: 'get',
            url: `${SteamSpyUrl}?request=top100in2weeks`,
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

//Returns Top 100 games for all time.
router.get('/top100AllTime', async function(req, res, next){
    try{
        const response = await axios({
            method: 'get',
            url: `${SteamSpyUrl}?request=top100forever`,
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

//Routes for Steam Store Data Api on Rapid API
//Link to rapid API page https://rapidapi.com/archergardinersheridan/api/steam-store-data

const steamStoreDataUrl = "https://steam-store-data.p.rapidapi.com";
const steamStoreDataHost = "steam-store-data.p.rapidapi.com";

router.get('/getFeaturedGames', async function(req, res, next){
    try{
        const response = await axios({
            method: 'get',
            url: `${steamStoreDataUrl}/api/featured`,
            headers: {
                "X-RapidAPI-Key": steamStoreDataKey,
                "X-RapidAPI-Host": steamStoreDataHost
            }
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

router.get('/getFeaturedCats', async function(req, res, next){
    try{
        const response = await axios({
            method: 'get',
            url: `${steamStoreDataUrl}/api/featuredcategories`,
            headers: {
                "X-RapidAPI-Key": steamStoreDataKey,
                "X-RapidAPI-Host": steamStoreDataHost
            }
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

//Routes for Steam API
const steamApiUrl = "https://store.steampowered.com";

router.get('/getAppDetails', async function(req,res,next){
    const q = req.query;
    const appId = req.query.appId;

    try{
        const response = await axios({
            method: 'get',
            url: `${steamApiUrl}/api/appdetails?appids=${appId}`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

// router.get('/getFeaturedCats', async function(req,res,next){
//     try{
//         const response = await axios({
//             method: 'get',
//             url: `${steamApiUrl}/api/featuredcategories/?l=english`
//         });
//         return res.status(201).json(response.data);
//     }
//     catch(err){
//         return next(err);
//     }
// });

module.exports = router;