import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Recipes } from '../../api/recipes/Recipes';

const MakeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={recipe.picture} width={200} />
        <Card.Title>
          <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{recipe.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};
const ProfilesPage = () => {
  const { ready, profile: userProfile, userRecipe } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const user = Meteor.user();
    const profile = user ? Profiles.collection.findOne({ email: user.emails[0].address }) : null;
    const sub2 = Meteor.subscribe(Recipes.userPublicationName);
    const recipe = user ? Recipes.collection.find({ email: user.emails[0].address }).fetch() : [];

    return {
      ready: sub1.ready() && sub2.ready(), // Ensure both subscriptions are ready
      profile: profile,
      userRecipe: recipe,
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.profilesPage}>
      <Row>
        <Col md={12} className="text-center text-danger">
          <h1>Profile Page</h1>
        </Col>
      </Row>
      <Row>
        {userProfile && (
          <>
            <Col md={6}>
              <div className="m-3">
                <img src={userProfile.picture} alt={`${userProfile.firstName} ${userProfile.lastName}`} width={300} />
              </div>
              <div className="pt-4 m-5">
                <h2>{userProfile.firstName} {userProfile.lastName}</h2>
              </div>
              <div className="pt-4">
                <p>{userProfile.bio}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="pt-2">
                <h2>My Recipes</h2>
                {userRecipe && userRecipe.length > 0 ? (
                  <Row xs={1} md={2} className="g-2">
                    {userRecipe.map(recipe => (
                      <MakeCard key={recipe._id} recipe={recipe} />
                    ))}
                  </Row>
                ) : (
                  <p>No recipes found.</p>
                )}
              </div>
              <div className="pt-4">
                <h2>Favorite Recipes</h2>

              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};
export default ProfilesPage;
