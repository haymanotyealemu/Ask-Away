import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <Hero backgroundImage="https://img.lovepik.com//photo/50051/9214.jpg_300.jpg">
        <h1>ASK-AWAY</h1>
      </Hero>
      <Container style={{ marginTop: 20 }}>
        <Row>
          <Col classname="text-landing"size="md-6">
            <div>
            <p className="text-header font__p p__size">Welcome To <span style={{ color: '#3cd1fd',  'font-size': '1.7em', 'font-weight': 'bold', 'font-family': 'Kaushan Script sans-serif'}} className="larger">Ask Away! </span> </p>
            </div>
            <div>
            <span className='app_color_font style'>Ask Away!</span> is a new forum about achieving success
            </div>
            
            If You are looking for answers on questions like:
            <ul>
              <li>
              How to start a business?
              </li>
              <li>
              How to grow Your company?
              </li>
              <li>
              How to improve yourself every day
              </li>
              <li>
              or You just want to share Your story
              </li>
              <div className="text-button-wrapper text-center" >
                <Link to="/register"style={{background: '#3cd1fd',  padding: '5px', 'font-family': 'Barlow sans-serif', 'text-decoration': 'none'}}>Register</Link> and add post!
              </div>
            </ul>
          </Col>
        </Row>
        </Container>
    </div>

  );
}

export default LandingPage;