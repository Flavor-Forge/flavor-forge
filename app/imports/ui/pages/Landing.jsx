import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
          Welcome to Flavor Forge
        </h1>
        <Col xs={6} className="mx-auto">
          <Image className="" src="/images/mock-home-page.png" width={500} />
        </Col>
        <h3 style={{ paddingBottom: '20px', color: 'white' }}>
          Recipes you can make in a dorm room at the click of a button!
        </h3>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: '#921b22' }}>Start by making your profile....</h2>
        <Row md={1} lg={2}>
          <Col xs={6} className="mx-auto">
            <Image src="/images/profile-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-green-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>...then look for recipes</h2>
        <Row md={1} lg={2}>
          <Col xs={6} className="mx-auto">
            <Image src="/images/mock-recipe-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center">
      <h2 style={{ color: '#921b22' }}>
        Start creating your desired dish!
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6} className="mx-auto">
            <Image src="/images/recipe-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
