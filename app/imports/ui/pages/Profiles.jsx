import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col} from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import {  PageIDs } from '../utilities/ids';

const ProfilesPage = () => {
  const { ready, profile } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const email = Meteor.user().emails[0].address;
    const profile = Profiles.collection.findOne({ email });

    return {
      ready: sub1.ready(),
      profile
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.profilesPage}>
      <Row>
        <Col md={12} className="text-center">
          <h1>Profile Page</h1>
        </Col>
      </Row>
      <Row>
        {profile && (
          <React.Fragment>
            <Col md={6}>
              <div>
                <img src={profile.picture} alt={`${profile.firstName} ${profile.lastName}`} width={200}/>
                <h3>{profile.firstName} {profile.lastName}</h3>
                <p2>{profile.bio}</p2>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h2>My Recipes</h2>

              </div>
              <div>
                <h2>Favorite Recipes</h2>

              </div>
            </Col>
          </React.Fragment>
        )}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};
export default ProfilesPage;
