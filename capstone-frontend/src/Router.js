import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {Home} from "./Home";
import { GameDetails } from "./games/GameDetails";
import { Logout } from "./miscComponents/Logout";

export function Router(){
    
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/app/:id" element={<GameDetails/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}