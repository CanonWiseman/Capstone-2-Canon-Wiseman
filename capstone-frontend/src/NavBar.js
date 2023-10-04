import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { SearchForm } from "./forms/SearchForm";
import { useLocalStorage } from "@uidotdev/usehooks";

export function NavBar(){

    const [steamId] = useLocalStorage('steamId');

    return (
        <div className="NavBar">
            <Navbar expand="md">
                <Link to="/" className="NavBar-logo">
                    Steam DB
                </Link>
                <SearchForm/>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {/* <NavLink to="#">Sales</NavLink>
                        <NavLink to="#">Charts</NavLink>
                        <NavLink to="#">Calculator</NavLink> */}
                        {steamId? 
                            <NavLink to="/logout">logout</NavLink>
                        : <NavLink to="/login">login</NavLink> }
                        
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}