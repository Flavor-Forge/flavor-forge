import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
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
        <Image src={recipe.picture} width={230} />
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
