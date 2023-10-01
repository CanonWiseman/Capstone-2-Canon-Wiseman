
const express = require("express");
const axios = require('axios');
const {steamStoreDataKey, steamApiKey} = require('../secret');
const router = new express.Router();

//**************************/
//Routes for Steam Spy API
//link to Steam Spy API page https://steamspy.com/api.php
//**************************/

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

router.get('/getSteamSpyDetails', async function(req, res, next){
    const appId = req.query.appId
    try{
        const response = await axios({
            method: 'get',
            url: `${SteamSpyUrl}?request=appdetails&appid=${appId}`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

//**************************/
//Routes for Steam Store Data Api on Rapid API
//Link to rapid API page https://rapidapi.com/archergardinersheridan/api/steam-store-data
//**************************/
//None of the these routes are needed but will be kept just in case

const steamStoreDataUrl = "https://steam-store-data.p.rapidapi.com";
const steamStoreDataHost = "steam-store-data.p.rapidapi.com";

// router.get('/getFeaturedGames', async function(req, res, next){
//     try{
//         const response = await axios({
//             method: 'get',
//             url: `${steamStoreDataUrl}/api/featured`,
//             headers: {
//                 "X-RapidAPI-Key": steamStoreDataKey,
//                 "X-RapidAPI-Host": steamStoreDataHost
//             }
//         });
//         return res.status(201).json(response.data);
//     }
//     catch(err){
//         return next(err);
//     }
// });

// router.get('/getFeaturedCats', async function(req, res, next){
//     try{
//         const response = await axios({
//             method: 'get',
//             url: `${steamStoreDataUrl}/api/featuredcategories`,
//             headers: {
//                 "X-RapidAPI-Key": steamStoreDataKey,
//                 "X-RapidAPI-Host": steamStoreDataHost
//             }
//         });
//         return res.status(201).json(response.data);
//     }
//     catch(err){
//         return next(err);
//     }
// });


//**************************/
//Routes for Steam API
//**************************/
const steamApiUrl = "https://store.steampowered.com";

router.get('/getAppDetails', async function(req,res,next){
    const appId = req.query.appId;

    try{
        const response = await axios({
            method: 'get',
            url: `${steamApiUrl}/api/appdetails?appids=${appId}&l=english`
        });  
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

router.get('/getFeaturedCats', async function(req,res,next){
    try{
        const response = await axios({
            method: 'get',
            url: `${steamApiUrl}/api/featuredcategories/?l=english`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

router.get('/getWishlist', async function(req,res,next){
    const steamId = req.query.steamId;
    try{
        const response = await axios({
            method: 'get',
            url: `${steamApiUrl}/wishlist/profiles/${steamId}/wishlistdata`
        }); 
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

//**************************/
//Routes for steam powered
//**************************/

const steamPoweredApiUrl = "https://api.steampowered.com";

router.get("/getCurrentPlayerCounts", async function(req, res, next){
    const appId = req.query.appId;
    try{
        const response = await axios({
            method: 'get',
            url: `${steamPoweredApiUrl}/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${appId}`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return res.status(201).json({response: {player_count: 0}});
    }
});

router.get("/getAppNews", async function(req, res, next){
    const appId = req.query.appId;
    try{
        const response = await axios({
            method: 'get',
            url: `${steamPoweredApiUrl}/ISteamNews/GetNewsForApp/v2?appid=${appId}&l=english`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return res.status(201).json({response: {player_count: 0}});
    }
});

router.get("/getGameSchema", async function(req, res, next){
    const appId = req.query.appId;
    try{
        const response = await axios({
            method: 'get',
            url: `${steamPoweredApiUrl}/ISteamUserStats/GetSchemaForGame/v2?appid=${appId}&key=${steamApiKey}`
        });
        return res.status(201).json(response.data.game.availableGameStats.achievements);
    }
    catch(err){
        return res.status(201).json({game: {availableGameStats: {achievements: []}}});
    }
});

router.get("/getAchievementPercentage", async function(req, res, next){
    const appId = req.query.appId;
    try{
        const response = await axios({
            method: 'get',
            url: `${steamPoweredApiUrl}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2?appid=${appId}`
        });
        return res.status(201).json(response.data.game.availableGameStats.achievements);
    }
    catch(err){
        return res.status(201).json({game: {availableGameStats: {achievements: []}}});
    }
});

router.get("/getAllApps", async function(req, res, next){
    try{
        const response = await axios({
            method: 'get',
            url: `${steamPoweredApiUrl}/ISteamApps/GetAppList/v0002/?format=json`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return next(err);
    }
});

router.get('/getPlayerSteamLevel', async function(req, res, next){
    const steamId = req.query.steamId;
    try{
        const response = await axios({
            method: 'get',
            url: `${steamPoweredApiUrl}/IPlayerService/GetSteamLevel/v1/?key=${steamApiKey}&steamid=${steamId}`
        });
        return res.status(201).json(response.data);
    }
    catch(err){
        return res.status(201).json({response: {player_level: "failed"}});
    }
});

router.get('/getPlayerSteamGames', async function(req, res, next){
   const steamId = req.query.steamId;
   try{
    const response = await axios({
        method: 'get',
        url: `${steamPoweredApiUrl}/IPlayerService/GetOwnedGames/v1/?key=${steamApiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&include_extended_appinfo=true`
    });
    return res.status(201).json(response.data);
   }
   catch(err){
    return next(err);
   }
});

router.get('/getPlayerRecentlyPlayed', async function(req, res, next){
    const steamId = req.query.steamId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${steamApiKey}&steamid=${steamId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerRecentlyPlayed', async function(req, res, next){
    const steamId = req.query.steamId;
    const appId = req.query.appId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/IPlayerService/GetSingleGamePlaytime/v1/?key=${steamApiKey}&steamid=${steamId}&appId=${appId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerBadges', async function(req, res, next){
    const steamId = req.query.steamId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/IPlayerService/GetBadges/v1/?key=${steamApiKey}&steamid=${steamId}`
     });
     const response2 = await axios({
        method: 'get',
        url: "https://github.com/nolddor/steam-badges-db/raw/main/data/badges.min.json"
     });
     response.data["badgeInfo"] = response2.data;
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerCommunityBadges', async function(req, res, next){
    const steamId = req.query.steamId;
    const badgeId = req.query.badgeId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/IPlayerService/GetCommunityBadgeProgress/v1/?key=${steamApiKey}&steamid=${steamId}&badgeid=${badgeId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerFriends', async function(req, res, next){
    const steamId = req.query.steamId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/ISteamUser/GetFriendList/v1?key=${steamApiKey}&steamid=${steamId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerSummaries', async function(req, res, next){
    const steamIds = req.query.steamIds;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/ISteamUser/GetPlayerSummaries/v2?key=${steamApiKey}&steamids=${steamIds}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerAchievements', async function(req, res, next){
    const steamId = req.query.steamId;
    appId = req.query.appId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/ISteamUserStats/GetPlayerAchievements/v1??key=${steamApiKey}&steamid=${steamId}&appid=${appId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getGlobalPlayerAchievements', async function(req, res, next){
    appId = req.query.appId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2?gameid=${appId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });

 router.get('/getPlayerStats', async function(req, res, next){
    appId = req.query.appId;
    steamId = req.query.steamId;
    try{
     const response = await axios({
         method: 'get',
         url: `${steamPoweredApiUrl}/ISteamUserStats/GetUserStatsForGame/v2?key=${steamApiKey}&steamid=${steamId}&appid=${appId}`
     });
     return res.status(201).json(response.data);
    }
    catch(err){
     return next(err);
    }
 });
//**************************/
//routes for steamworks API
//**************************/

const steamworksUrl = "https://partner.steam-api.com";






module.exports = router;