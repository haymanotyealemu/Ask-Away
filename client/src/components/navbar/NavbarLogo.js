import React from "react";
import { Link } from "react-router-dom";
import comment3 from "../../comment3.jpg";
const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img className="image2" src={comment3} alt="logo" />
      </Link>
    </div>
  );
};

export default NavbarLogo;