import React from "react";
import { Link } from "react-router-dom";
import AskAway2 from "../../AskAway2.jpg";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={AskAway2} alt="logo" />
      </Link>
    </div>
  );
};

export default NavbarLogo;