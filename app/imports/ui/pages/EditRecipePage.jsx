import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditRecipePage = () => {
  const { recipeId } = useParams(); // Retrieve the recipe ID from the URL parameters
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
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch recipe');
        }
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update the recipe');
      }
      alert('Recipe updated successfully!');
      navigate(`/recipe/${recipeId}`); // Redirect to the view page of the updated recipe
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1>Edit Recipe</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formRecipeName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRecipeDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter recipe description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRecipeIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRecipeInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter cooking instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
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
