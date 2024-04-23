import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background pb-3">
      <Container className="text-center" fluid>
        <h1 style={{ color: 'white', fontSize: '36pt' }}>
          Welcome to Flavor Forge
        </h1>
        <Image className="mx-auto mb-3" src="/images/mock-home-page.png" height={400} style={{ border: '5px solid white' }} />
        <h3 style={{ color: 'white' }}>
          Recipes you can make in a dorm room at the click of a button!
        </h3>
      </Container>
    </div>
    <div className="landing-white-background pb-3">
      <Container className="justify-content-center text-center" fluid>
        <h2 style={{ color: '#009639' }}>Start by making your profile....</h2>
        <Row md={1} lg={2} className="mt-3">
          <Image className="mx-auto mb-3" src="/images/profile-page.png" height={400} style={{ border: '5px solid #009639' }} />
        </Row>
      </Container>
    </div>
    <div className="landing-green-background pb-3">
      <Container className="justify-content-center text-center" fluid>
        <h2 style={{ color: 'white' }}>...then look for recipes</h2>
        <Row md={1} lg={2} className="mt-3">
          <Image className="mx-auto mb-3" src="/images/mock-recipe-page.png" height={400} style={{ border: '5px solid white' }} />
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center pb-3">
      <h2 style={{ color: '#009639' }}>
        Start creating your desired dish!
      </h2>
      <Container fluid>
        <Row md={1} lg={2} className="mt-3">
          <Image className="mx-auto mb-3" src="/images/recipe-page.png" height={400} style={{ border: '5px solid #009639' }} />
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
