import React from "react";
import AskAway2 from "../AskAway2.jpg";
import { Link } from "react-router-dom";

import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <div className="text-wrapper">
        <div className="text-header-wrapper">
          <p className="text-header font__p p__size">Welcome in</p>
          <span>Ask Away! </span>
        </div>

        <div className="text-section font__p p__size">
          It is new forum about achieving success
          <br />
          If You are looking for answers on questions like:
          <ul>
            <li>How to start my business?</li>
            <li>How to grow company?</li>
            <li>How to improve yourself every day</li>
            <li>or You just want to share Your story</li>
          </ul>
          <div className="text-button-wrapper">
            <Link to="/register">Register</Link> and add post!
          </div>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={ AskAway2} className="landing-image" alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
