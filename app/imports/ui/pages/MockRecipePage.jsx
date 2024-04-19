import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const MockRecipePage = () => {


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
