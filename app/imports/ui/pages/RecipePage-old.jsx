import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipes } from '../../api/recipes/Recipes';
import { PageIDs } from '../utilities/ids';
import { pageStyle } from './pageStyles';

const RecipePageOld = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipe = await Recipes.collection.findOne({ _id: recipeId });
        if (recipe) {
          setSelectedRecipe(recipe);
        } else {
          setError('Recipe not found');
        }
      } catch (fetchError) {
        setError('Error fetching recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();

    return () => {
      setSelectedRecipe(null);
    };
  }, [recipeId]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  let content = null;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (selectedRecipe) {
    content = (
      <Container id={PageIDs.recipePage} style={pageStyle}>
        <h1 className="text-center mt-2">{selectedRecipe.name}</h1>
        <Button variant="primary" onClick={handleEdit} style={{ margin: '10px 0' }}>Edit Recipe</Button>
        <h3 className="text-center mb-4">Rating: {selectedRecipe.rating}/5</h3>
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5>Description</h5>
                <Card.Text>{selectedRecipe.description}</Card.Text>
                <h5>Ingredients</h5>
                <ListGroup variant="flush">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <ListGroup.Item key={idx}>
                      {ingredient.quantity} {ingredient.name} - ${ingredient.price.toFixed(2)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <h5>Instructions</h5>
                <Card.Text className="mt-3">{selectedRecipe.instructions}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <div style={{ maxWidth: '100%', maxHeight: '400px' }}>
              <img
                src={`${selectedRecipe.picture}`}
                alt={selectedRecipe.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return <Container fluid>{content}</Container>;
};

export default RecipePageOld;
