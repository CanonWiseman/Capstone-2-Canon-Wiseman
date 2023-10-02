import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SteamApis {
  // the token for interactive with the API will be stored here.
  // static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //functions for Steam Spy API
  //link to Steam Spy API page https://steamspy.com/api.php

  //Get top 100 games from the last 2 weeks
  static async getTopTwoWeeks(){
    let res = await this.request('steam/top100twoWeeks');
    return res;
  }

  //Get top 100 games from all time
  static async getTopAllTime(){
    let res = await this.request('steam/top100AllTime');
    return res;
  }

  static async getSteamSpyDetails(appId){
    let res = await this.request(`steam/getSteamSpyDetails?appId=${appId}`);
    return res;
  }

  //******end functions for Steam Spy API  *************/

  //functions for Steam Store Data Api on Rapid API
  //Link to rapid API page https://rapidapi.com/archergardinersheridan/api/steam-store-data

  //Get featured games

  static async getFeaturedGames(){
    let res = await this.request('steam/getFeaturedGames');
    return res;
  }

  static async getFeaturedCats(){
    let res = await this.request('steam/getFeaturedCats');
    return res;
  }
  //**************end functions for steam store data api ******************/

  //functions for Steam API
  static async getAppDetails(appId){
    let res = await this.request(`steam/getAppDetails?appId=${appId}`);
    return res;
  }

  static async getWishlist(steamId){
    let res = await this.request(`steam/getWishlist?steamId=${steamId}`);
    return res;
  }

  static async getReviews(appId, reviewType){
    let res = await this.request(`steam/getReviews?appId=${appId}&reviewType=${reviewType}`);
    return res;
  }
  //**************end functions for steam api ******************/

  //functions for steam powered api
  static async getPlayerCount(appId){
    let res = await this.request(`steam/getCurrentPlayerCounts?appId=${appId}`);
    return res;
  }

  static async getAppNews(appId){
    let res = await this.request(`steam/getAppNews?appId=${appId}`);
    return res;
  }

  static async getGameSchema(appId){
    let res = await this.request(`steam/getGameSchema?appId=${appId}`);
    return res;
  }

  static async getAllApps(){
    let res = await this.request('steam/getAllApps');
    return res;
  }

  static async getPlayerLevel(steamId){
    let res = await this.request(`steam/getPlayerSteamLevel?steamId=${steamId}`);
    return res;
  }

  static async getPlayerGames(steamId){
    let res = await this.request(`steam/getPlayerSteamGames?steamId=${steamId}`);
    return res;
  }

  static async getPlayerRecentlyPlayed(steamId){
    let res = await this.request(`steam/getPlayerRecentlyPlayed?steamId=${steamId}`);
    return res;
  }

  static async getPlayerBadges(steamId){
    let res = await this.request(`steam/getPlayerBadges?steamId=${steamId}`);
    return res;
  }

  static async getPlayerCommunityBadges(steamId, badgeId){
    let res = await this.request(`steam/getPlayerCommunityBadges?steamId=${steamId}&badgeId=${badgeId}`);
    return res;
  }

  static async getPlayerFriends(steamId){
    let res = await this.request(`steam/getPlayerFriends?steamId=${steamId}`);
    return res;
  }

  static async getPlayerSummary(steamIds){
    let res = await this.request(`steam/getPlayerSummaries?steamIds=${steamIds}`);
    return res;
  }
  
  static async getPlayerAchievments(steamId, appId){
    let res = await this.request(`steam/getPlayerAchievements?steamId=${steamId}&appId=${appId}`);
    return res;
  }

  static async getGlobalPlayerAchievments(appId){
    let res = await this.request(`steam/getGlobalPlayerAchievements?appId=${appId}`);
    return res;
  }

  static async getPlayerStats(appId, steamId){
    let res = await this.request(`steam/getPlayerStats?appId=${appId}&steamId=${steamId}`);
    return res;
  }
  
  //**************end functions for steam powered api ******************/

   //**************functions for steam works api ******************/
    //**************end functions for steam powered api ******************/
}
export default SteamApis;
