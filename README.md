# STEAM SYNC
https://steam-sync.onrender.com/

*if you dont have a steamID you can borrow mine*

*76561198043728206*

**What is Steam Sync?**

Steam Sync is a  third party web service that scrapes up to date information from steams various apis and packages it into one place. The primary goal of steam sync is to create a personalized web page for gamers to stay up to date on the latest news and patches for their recently played games as well as the games on their wishlist.

The secondary goal of Steam Sync is a way for gamers to explore steam without the unnecessary clutter that steam has naturally.

**Where can I find my Steam ID**

Your steam ID can be found under your account name in the account details page on steams website/app. Steam IDs are not sensitive information so don't worry about plugging it into Steam Sync. If you do not wish to change your steam privacy settings but still want to check out Steam Sync, feel free to plug my Steam ID in (located at the top of this page).

**Why is my information not showing up?**

Some information on Steam Sync will not show up when logged in or viewing friends or other users pages. This is due to privacy information set within the steam profile. If you want to change your privacy settings they can be accessed under Profile > edit profile > privacy settings. 

**How do I change what games show up on my front page?**

Steam Sync only pulls data from your steam profile so can only be changed as such. If you want to change your wishlist news you must change your wishlist directly in steams client or website. To change your steam recently played, you must play different games! or alternatively to see any specific game information you can always type the games title into the search bar and load up any software or hardware on Steam.

**USER FLOW**

The user flow for Steam Sync depends largely on how much the user wants to explore the steam store. The basic flow would be logging in. Catching up on the latest news and patches from their recently played and wishlisted games. Then the user is off to their own devices exploring any app or hardware steam has to offer.

**No DB?**

Originally, there was plans for a database that would allow for some social features as well as some additional features for the wishlist. As I continued working on the project I realized that I did not want this project to be a social project. I also realized that I wanted this project to be a direct correlation to the users activity on steam. So I decided to scrap the DB on Steam Sync and focus purely on the features that I wanted to integrate. 

**APIS**

The first API I will be scraping from is [https://store.steampowered.com/](https://store.steampowered.com/)

This api will be used for a majority of the individual app information and store featured categories as well as some of the individual user information like wishlist data and app reviews.

The second API will be [https://api.steampowered.com/](https://api.steampowered.com/)

This api will be the a majority of the API calls for user information and the rest of the information I will need for app details, news and other sections of the site.

With both of these APIs, the data will need to be cleaned before they are used as both apis do not have standardized data and sometimes returns data that will not work within the site.

**Looking Toward The Future**

While I am very happy with the current state of Steam Sync, here are some things I would like to improve in the future.

 - Faster loading times for each page
 - A cleaner way to parse Steams BBCode 
 - Either a way to filter out languages from news articles or a way to translate articles to a specific language

