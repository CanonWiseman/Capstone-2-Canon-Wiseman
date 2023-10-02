import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {Home} from "./Home";
import { UserFriends } from "./user/UserFriends";
import { GameDetails } from "./games/GameDetails";
import { Logout } from "./miscComponents/Logout";
import { UserProfile } from "./user/UserProfile";

export function Router(){
    
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/app/:id" element={<GameDetails/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/users/:id" element={<UserProfile/>}/>
            <Route path="/users/:id/friends" element={<UserFriends/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}