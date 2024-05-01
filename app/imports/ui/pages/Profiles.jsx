import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Recipes } from '../../api/recipes/Recipes';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function getRecipeData(recipeName) {
  const recipe = Recipes.collection.findOne({ name: recipeName });
  return recipe;
}

const MakeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={recipe.picture} width={285} />
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
    _id: PropTypes.string.isRequired, // Assuming _id is the unique identifier for the recipe
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};
const ProfilesPage = () => {
  const { ready, profile } = useTracker(() => {
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const email = Meteor.user().emails[0].address;
    const profile = Profiles.collection.findOne({ email });
    const recipes = Recipes.collection.findOne({ email });
    const recipeData = recipes.map(recipe => getRecipeData(recipe.name));

    return {
      ready: sub1.ready(),
      profile,
      //recipes
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
        {profile && (
          <React.Fragment>
            <Col md={6}>
              <div class="m-3">
                <img src={profile.picture} alt={`${profile.firstName} ${profile.lastName}`} width={300}/>
              </div>
              <div class="pt-4 m-5">
                <h2>{profile.firstName} {profile.lastName}</h2>
              </div>
              <div class="pt-4">
                <p>{profile.bio}</p>
              </div>
            </Col>
            <Col md={6}>
              <div class="pt-2">
                <h2>My Recipes</h2>
                  <Row xs={1} md={2} lg={4} className="g-2">
                    {recipeData.map((recipe, index) => <MakeCard key={index} recipe={recipe} />)}
                  </Row>
              </div>
              <div class="pt-4">
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
