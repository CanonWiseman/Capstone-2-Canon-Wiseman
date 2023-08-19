import React, {useContext} from "react";
import { NavLink, useNavigate, Link, Outlet } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

export function NavBar(){
    return (
        <>
            <div className="NavBar">
                <Navbar expand="md">
                    <Link to="/" className="NavBar-logo">
                        Steam DB
                    </Link>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="#">Sales</NavLink>
                            <NavLink to="#">Charts</NavLink>
                            <NavLink to="#">Calculator</NavLink>
                            <NavLink to="#">Upcoming</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
            {/* Outlet is for the other content to come through under the navbar */}
            <Outlet>
            </Outlet>
        </>
    )
}