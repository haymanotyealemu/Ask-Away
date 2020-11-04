import React from "react";
import { Link } from "react-router-dom";
import askaway2 from "../../askaway2.png";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={askaway2} alt="" />
      </Link>
    </div>
  );
};

export default NavbarLogo;