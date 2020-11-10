import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/" className="text-logo">
        <ul>
          <li>A</li>
          <li>S</li>
          <li>K</li>
          <li>-</li>
          <li>A</li>
          <li>W</li>
          <li>A</li>
          <li>Y</li>
        </ul>
      </Link>
    </div>
  );
};

export default NavbarLogo;