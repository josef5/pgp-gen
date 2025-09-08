import React from "react";
import { NavLink } from "react-router";
import { useLocation } from "react-router";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="bg-background-secondary flex">
      <NavLink
        to="/"
        className={`flex h-12 w-56 items-center justify-center ${location.pathname === "/" ? "bg-background" : ""} text-base`}
      >
        Generate
      </NavLink>
      <NavLink
        to="/encrypt"
        className={`flex h-12 w-56 items-center justify-center ${location.pathname === "/encrypt" ? "bg-background" : ""} text-base`}
      >
        Encrypt
      </NavLink>
      <NavLink
        to="/decrypt"
        className={`flex h-12 w-56 items-center justify-center ${location.pathname === "/decrypt" ? "bg-background" : ""} text-base`}
      >
        Decrypt
      </NavLink>
      <div className="mr-4 w-56"></div>
    </nav>
  );
}

export default NavBar;
