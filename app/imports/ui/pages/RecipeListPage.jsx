import React from 'react';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header className="text-center">
        <Image src={recipe.picture} className="mx-auto d-block" style={{ width: '50%' }} /> {/* Centering the image */}
        <Card.Title><Link to="/recipe/:recipeId">{recipe.name}</Link></Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {recipe.description}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

const RecipesListPage = () => {
  const { recipes: trackedRecipes, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    const fetchedRecipes = Recipes.collection.find().fetch();
    return {
      recipes: fetchedRecipes,
      ready: subscription.ready(),
    };
  });

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <h1>Recipes</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {trackedRecipes.map((recipe) => (
          <RecipeCard key={recipe.recipeId} recipe={recipe} />
        ))}
      </Row>
    </Container>
  );
};

export default RecipesListPage;
