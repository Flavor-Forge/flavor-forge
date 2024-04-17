import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const MockRecipePage = () => {
  const recipe = {
    email: '123',
    recipeId: 'spaghetti-carbonara',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta.',
    ingredients: [
      { name: 'Spaghetti', quantity: '200g', price: 2.5 },
      { name: 'Pancetta', quantity: '100g', price: 3.0 },
      { name: 'Eggs', quantity: '2', price: 1.0 },
      { name: 'Parmesan cheese', quantity: '50g', price: 2.0 },
      { name: 'Black pepper', quantity: 'to taste', price: 0.5 },
    ],
    instructions:
        [
          `1. Cook spaghetti in boiling water until al dente.
          2. In a separate pan, fry pancetta until crispy.
          3. In a bowl, whisk together eggs and grated Parmesan cheese.
          4. Drain cooked spaghetti and transfer to the pan with crispy pancetta.
          5. Quickly add the egg mixture to the spaghetti and pancetta, stirring continuously to coat the pasta.
          6. Season with black pepper to taste.
          7. Serve immediately and enjoy!`,
        ],
    picture: 'images/spaghetticarbonara.jpg',
    rating: 4.3,
  };

  return (
    <Container fluid>
      <h1 className="text-center mt-2">{recipe.name}</h1>
      <h3 className="text-center mb-4">Rating: {recipe.rating}/5</h3>
      <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Description</h5>
              <Card.Text>{recipe.description}</Card.Text>
              <h5>Ingredients</h5>
              <ListGroup variant="flush">
                {recipe.ingredients.map((ingredient, idx) => (
                  <ListGroup.Item key={idx}>
                    {ingredient.quantity} {ingredient.name} - ${ingredient.price.toFixed(2)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h5>Instructions</h5>
              <Card.Text className="mt-3">{recipe.instructions}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div style={{ maxWidth: '100%', maxHeight: '400px' }}>
            <img
              src={recipe.picture}
              alt={recipe.name}
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MockRecipePage;
