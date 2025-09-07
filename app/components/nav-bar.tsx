import React from "react";
import { NavLink } from "react-router";
import { useLocation } from "react-router";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="flex bg-neutral-200">
      <NavLink
        to="/"
        className={`flex h-12 w-56 items-center justify-center ${location.pathname === "/" ? "bg-neutral-100" : ""} text-base`}
      >
        Generate
      </NavLink>
      <NavLink
        to="/encrypt"
        className={`flex h-12 w-56 items-center justify-center ${location.pathname === "/encrypt" ? "bg-neutral-100" : ""} text-base`}
      >
        Encrypt
      </NavLink>
      <NavLink
        to="/decrypt"
        className={`flex h-12 w-56 items-center justify-center ${location.pathname === "/decrypt" ? "bg-neutral-100" : ""} text-base`}
      >
        Decrypt
      </NavLink>
    </nav>
  );
}

export default NavBar;
