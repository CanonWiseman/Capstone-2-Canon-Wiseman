import Fuse from "fuse.js";

function fuseHelper(appName, allApps){
    
    const fuseOptions  = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.2,
        keys: ["appid", "name"],
    }

    const fuse = new Fuse(allApps, fuseOptions);

    const fuseResult = fuse.search(appName);
    console.log(fuseResult);
}

export {fuseHelper};