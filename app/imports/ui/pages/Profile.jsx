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
                  {/* Placeholder for personal recipe cards */}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>Favorite Recipes</h2>
                  {/* Placeholder for favorite recipe cards */}
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
