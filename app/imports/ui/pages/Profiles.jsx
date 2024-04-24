import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Badge, Container, Card, Image, Row, Col, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { NavLink } from 'react-router-dom';

/* Returns the Profile and associated Projects and Interests associated with the passed user email. */
/*function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
  const projectPictures = projects.map(project => Projects.collection.findOne({ name: project })?.picture);
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({}, data, { interests, projects: projectPictures });
}*/

/* Component for layout out a Profile Card. */
/* const MakeCard = ({ profile }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={profile.picture} width={50} />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle><span className="date">{profile.title}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {profile.bio}
        </Card.Text>
        <Card.Text>
          {profile.interests.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
        </Card.Text>
        <h5>Projects</h5>
        {profile.projects.map((project, index) => <Image key={index} src={project} width={50} />)}
      </Card.Body>
    </Card>
  </Col>
);
*/
/*
MakeCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    title: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    projects: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}; */

/* Renders the Profile Collection as a set of Cards. */
/*const ProfilesPage = () => {

  /*const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
    const sub4 = Meteor.subscribe(Projects.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
    };
  }, []);
  const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const profileData = emails.map(email => getProfileData(email));
  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {profileData.map((profile, index) => <MakeCard key={index} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
   */

/*const { ready, profiles } = useTracker(() => {
  const { ready, currentUser, profile } = useTracker(() => {
    const sub1 = Meteor.subscribe('userData');
    const sub2 = Meteor.subscribe('profiles');

    const currentUser = Meteor.user();
    const profile = currentUser ? Profiles.collection.findOne({ email: currentUser.email }) : null;

    return {
      ready: sub1.ready() && sub2.ready(),
      currentUser,
      profile,
    };
  }, []);

  if (!ready) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  if (!profile) {
    // Handle case where profile information is not found for the current user
    return <div>No profile found for the current user.</div>;
  }

  return (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row>
        <Col md={6}>
          <div>
            <img src={profile.picture} alt={profile.firstName} width={100} />
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p>{profile.bio}</p>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <h2>My Recipes</h2>
            {/* Add your My Recipes card component here */ //}
/*</div>
<div>
  <h2>Favorite Recipes</h2>
  {/* Add your Favorite Recipes card component here */ //}
/*</div>
</Col>
</Row>
</Container>
);
};*/
/*const ProfilesPage = () => {
  const { ready, profiles } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
    const sub4 = Meteor.subscribe(Projects.userPublicationName);

    const profiles = Profiles.collection.find().fetch();

    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
      profiles
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row>
        {profiles.map(profile => (
          <React.Fragment key={profile._id}>
            <Col md={6}>
              <div>
                <img src={profile.picture} alt={profile.firstName} width={100} />
                <h3>{profile.firstName} {profile.lastName}</h3>
                <p>{profile.bio}</p>
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
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};
*/
const ProfilesPage = () => {
  const { ready, profiles } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);

    const profiles = Profiles.collection.find().fetch();

    return {
      ready: sub1.ready(),
      profiles
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row>
        {profiles.map(profile => (
          <React.Fragment key={profile._id}>
            <Col md={5}>
              <div>
                <img src={profile.picture} alt={profile.firstName} width={200} />
                <h3>{profile.firstName} {profile.lastName}</h3>
                <p2>{profile.bio}</p2>
              </div>
            </Col>
            <Col md={5}>
              <div>
                <h3>My Recipes</h3>

              </div>
              <div>
                <h3>Favorite Recipes</h3>

              </div>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

/*
const ProfilesPage = () => {
  const { ready, profile } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const profile = Profiles.collection.findOne({ userId: Meteor.userId() });

    return {
      ready: sub1.ready(),
      profile
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.profilesPage}>
      {profile ? (
        <Row>
          <Col md={6}>
            <div>
              <img src={profile.picture} alt={`${profile.firstName} ${profile.lastName}`} width={200} />
              <h3>{profile.firstName} {profile.lastName}</h3>
              <p>{profile.bio}</p>
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
        </Row>
      ) : (
        <Row>
          <Col md={12}>
            <p>No profile found</p>
          </Col>
        </Row>
      )}
    </Container>
  ) : <LoadingSpinner />;
};*/
export default ProfilesPage;
