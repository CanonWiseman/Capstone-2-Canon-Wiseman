import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { SearchForm } from "./forms/SearchForm";

export function NavBar(){
    return (
        <div className="NavBar">
            <Navbar expand="md">
                <Link to="/" className="NavBar-logo">
                    Steam DB
                </Link>
                <SearchForm/>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to="#">Sales</NavLink>
                        <NavLink to="#">Charts</NavLink>
                        <NavLink to="#">Calculator</NavLink>
                        <NavLink to="/logout">logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}