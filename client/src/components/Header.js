import React from "react";
import {Container} from "react-bootstrap";
import landing from "../landing.jpg";
import Jumbotron from 'react-bootstrap';
const Header=()=>{
    return(
        <Jumbotron fluid>
            <Container>
                <img src={ landing } alt="background"/>
                <p>
                    ASK-AWAY
                </p>
            </Container>
        </Jumbotron>
    );
}
export default (Header);

