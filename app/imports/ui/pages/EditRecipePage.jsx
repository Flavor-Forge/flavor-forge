import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        if (!response.ok) {
          const text = await response.text(); // Get text to see what went wrong
          throw new Error(`HTTP error ${response.status}: ${text}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error('Failed to fetch recipe details:', err);
        setError(`Failed to fetch recipe details: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error ${response.status}: ${text}`);
      }

      // eslint-disable-next-line no-unused-vars
      const result = await response.json();
      alert('Recipe updated successfully');
      navigate(`/recipes/${recipeId}`); // Redirect or update UI upon success
    } catch (err) {
      console.error('Failed to update recipe:', err);
      setError(`Failed to update recipe: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe(prevRecipe => ({ ...prevRecipe, [name]: value }));
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Update Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default EditRecipePage;
