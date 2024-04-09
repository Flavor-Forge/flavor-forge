import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';


/* Renders the Home Page: what appears after the user logs in. */
const HomePage = () => (
  <div id={PageIDs.homePage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <Row>
          <Image src="../images/flavorforgelogo.png" width={100} />
          <h2>Welcome To Flavor Forge</h2>
        </Row>
        <Row>
          <Col>
            <h4>What is Flavor Forge?</h4>
            <p>Flavor Forge is an online cookbook designed to help you meal plan on a budget! Flavor Forge is made by college students for college students. Most people in college are either not employed or working part-time. It can be difficult to get the proper nutrition with a limited income and ingredients. Flavor Forge is here to help you find the ingredients you need for your recipes and the best places to buy them.</p>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default HomePage;
