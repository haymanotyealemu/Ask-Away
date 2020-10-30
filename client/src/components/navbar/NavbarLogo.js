import React from "react";
import { Link } from "react-router-dom";
import askaway from "../../askaway.png";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={askaway} alt="" />
      </Link>
    </div>
  );
};

export default NavbarLogo;