import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Recipes } from '../../api/recipes/Recipes';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

function getRecipeData(email) {
  const data = Profiles.collection.findOne({ email });
  const recipe = _.pluck(Recipes.collection.find({ profile: email }).fetch(), 'recipe');
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({}, data, { recipe });
}
const MakeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={recipe.picture} width={50} />
        {/* eslint-disable-next-line react/prop-types */}
        <Card.Title>{recipe.recipeId}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {recipe.description}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  recipe: PropTypes.shape({
    recipeId: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};
const recipesListPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Recipes.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);
  const recipe = _.pluck(Recipes.collection.find().fetch(), 'recipe');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const recipeData = recipe.map(recipe => getRecipeData(email));
  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {/* eslint-disable-next-line no-shadow */}
        {recipeData.map((recipe, index) => <MakeCard key={index} recipe={recipe} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default recipesListPage;
