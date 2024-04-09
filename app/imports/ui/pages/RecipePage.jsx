import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Recipes } from '../api/RecipesCollection';

const RecipePage = ({ recipeId }) => {
  const recipe = Recipes.collection.findOne({ recipeId });

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const { name, description, instructions, picture } = recipe;

  return (
    <Container className="mt-5">
      <Row>
        {/* Recipe Info */}
        <Col md={8}>
          <h1>{name}</h1>
          <p>{description}</p>
          <h3>Instructions:</h3>
          <p>{instructions}</p>
        </Col>
        {/* Recipe Picture */}
        <Col md={4} className="text-center">
          <Image src={picture} alt={name} fluid />
        </Col>
      </Row>
    </Container>
  );
};

// Define PropTypes for the RecipePage component
RecipePage.propTypes = {
  recipeId: PropTypes.string.isRequired, // Ensure recipeId is a required string
};

export default RecipePage;
