import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';


/* Renders the Profile Page with profile information. */
const ProfilePage = () => {
  const { ready, profiles } = useTracker(() => {
    const sub = Meteor.subscribe('userData');
    return {
      ready: sub.ready(),
      profiles: Meteor.users.find().fetch(),
    };
  });

  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row>
        {profiles.map((profile, index) => (
          <React.Fragment key={index}>
            <Col md={6}>
              <Image src={profile.profile.picture} alt="User" roundedCircle style={{ width: '100px', height: '100px' }} />
              <h2>{profile.profile.firstName} {profile.profile.lastName}</h2>
              <p>{profile.profile.bio}</p>
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <h2>Personal Recipes</h2>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-center">Pork or Chicken Guisantes</Card.Title>
                      <Image src="../images/pork-guisantes.png" width={400}/>
                      <Card.Text>
                        Check out this recipe from FlavorForge!
                        <br/>
                        Rating: 3.5
                      </Card.Text>
                      <Button variant="primary" className="btn btn-dark">View Recipe</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>Favorite Recipes</h2>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-center">Pork or Chicken Guisantes</Card.Title>
                      <Image src="../images/pork-guisantes.png" width={400}/>
                      <Card.Text>
                        Check out this recipe from FlavorForge!
                        <br/>
                        Rating: 3.5
                      </Card.Text>
                      <Button variant="primary" className="btn btn-dark">View Recipe</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilePage;
