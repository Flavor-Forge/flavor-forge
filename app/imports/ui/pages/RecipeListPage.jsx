import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/Recipes';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import LoadingSpinner from '../components/LoadingSpinner';

function getRecipeData(recipeName) {
  const recipe = Recipes.collection.findOne({ name: recipeName });
  return recipe;
}

const MakeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={recipe.picture} width={285} />
        <Card.Title>{recipe.name}</Card.Title>
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
    name: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

const RecipesListPage = () => {
  const { ready } = useTracker(() => {
    const sub1 = Meteor.subscribe(Recipes.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);

  const recipes = Recipes.collection.find().fetch();
  const recipeData = recipes.map(recipe => getRecipeData(recipe.name));

  return ready ? (
    <Container id={PageIDs.recipesPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {recipeData.map((recipe, index) => <MakeCard key={index} recipe={recipe} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default RecipesListPage;
