import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [{ name: '', quantity: '', price: '' }],
    instructions: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Meteor.call('recipes.findOne', recipeId, (error, response) => {
      if (error) {
        setError('Failed to fetch recipe data.');
        setLoading(false);
      } else {
        setRecipe(response);
        setLoading(false);
      }
    });
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = recipe.ingredients.map((ingredient, idx) => {
      if (idx === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('recipes.update', recipeId, recipe, (error) => {
      if (error) {
        setError('Error updating recipe.');
      } else {
        navigate('/recipe-list'); // Ensure this is the correct path to your recipe list
      }
    });
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container>
      <h1>Edit Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={recipe.name || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={recipe.description || ''}
            onChange={handleChange}
          />
        </Form.Group>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-3">
            <Form.Label>Ingredient {index + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={e => handleIngredientChange(index, 'name', e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={e => handleIngredientChange(index, 'quantity', e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Price"
              value={ingredient.price}
              onChange={e => handleIngredientChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
        <Button variant="primary" type="submit">
          Submit Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditRecipePage;
