import React from "react";
import comment3 from "../comment3.jpg";
import { Link } from "react-router-dom";



const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <div className="text-wrapper">
        <div className="text-header-wrapper">
          <p className="text-header font__p p__size">Welcome to</p>
          <span className="larger">Ask Away!</span>
        </div>

        <div className="text-section font__p p__size">
        <span className='app_color_font style'>Ask Away!</span> is a new forum about achieving success
          <br />
          If you are looking for answers on questions like:
          <ul>
            <li>How to start your own business?</li>
            <li>How to grow your company?</li>
            <li>How to improve yourself every day?</li>
            <li>Or you just want to share your story!</li>
          </ul>
          <div className="text-button-wrapper">
            <Link to="/register">Register</Link> and add a post!
          </div>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={ comment3 } className="image" alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
