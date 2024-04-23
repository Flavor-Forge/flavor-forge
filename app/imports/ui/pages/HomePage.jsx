import React from 'react';
import { Container, Col, Row, Image, Card, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* Renders the Home Page: what appears after the user logs in. */
const HomePage = () => (
  <div id={PageIDs.homePage}>
    <div className="landing-green-background">
      <Container>
        <Row>
          <Container className="text-center">
            <h2>Welcome To Flavor Forge</h2>
            <Image src="../images/kcc-culinary.png" width={1000} className="rounded" />
          </Container>
        </Row>
        <Row>
          <Col>
            <Container className="text-center">
              <h2>What is Flavor Forge?</h2>
            </Container>
            <Container>
              <p>Flavor Forge is an online cookbook designed to help you meal plan on a budget! Flavor Forge is made by college students for college students. Most people in college are either not employed or working part-time. It can be difficult
                to get the proper nutrition with a limited income and ingredients. Flavor Forge is here to help you find the ingredients you need for your recipes and the best places to buy them.
              </p>
            </Container>
          </Col>
          <Col>
            <Container className="text-center">
              <h2>Featured Recipe</h2>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Pork or Chicken Guisantes</Card.Title>
                  <Image src="../images/pork-guisantes.png" width={400} />
                  <Card.Text>
                    Check out this recipe from FlavorForge!
                    <br />
                    Rating: 3.5
                  </Card.Text>
                  <Button variant="primary" className="btn btn-dark">View Recipe</Button>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default HomePage;
