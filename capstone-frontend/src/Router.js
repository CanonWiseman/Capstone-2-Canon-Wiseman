import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {Home} from "./Home";
import { NavBar } from "./NavBar";
import { GameDetails } from "./games/GameDetails";

export function Router(){
    return (
        <Routes>
            <Route element={<NavBar/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/app/:id" element={<GameDetails/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Route>
        </Routes>
    )
}