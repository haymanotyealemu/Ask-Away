import React from "react";

import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
      <div className="landing-wrapper">
          <div className="text-wrapper">
            <div className="text-header-wrapper">
              <p className="text-header font__p p__size">Welcome To</p>
              <span className="larger">Ask Away! </span>
            </div>

            <div className="text-section font__p p__size">
            <span className='app_color_font style'>Ask Away!</span> is a new forum about achieving success
              <br />
              If You are looking for answers on questions like:
              <ul>
                <li>How to start a business?</li>
                <li>How to grow Your company?</li>
                <li>How to improve yourself every day</li>
                <li>or You just want to share Your story</li>
              </ul>
              <div className="text-button-wrapper">
                <Link to="/register">Register</Link> and add post!
              </div>
            </div>
        </div>
        
    </div>
  );
};

export default LandingPage;
