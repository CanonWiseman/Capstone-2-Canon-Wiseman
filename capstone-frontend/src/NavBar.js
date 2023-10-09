import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { SearchForm } from "./forms/SearchForm";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./NavBar.css";

export function NavBar(){

    const [steamId] = useLocalStorage('steamId');

    return (
        <div className="NavBar">
            <Navbar expand="md">
                <Link to="/" className="NavBar-logo">
                    Steam Sync
                </Link>
                <Nav className="ml-auto d-flex align-items-center" navbar>
                    <SearchForm/>
                    <NavItem>
                        {steamId? 
                            <NavLink className="NavBar-link" to="/logout">logout</NavLink>
                        : null}
                        
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}