import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const AdminEditRecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // TODO: Fetch the recipes from the database and set them in state
  }, []);

  const handleEdit = (recipeId) => {
    // TODO: Implement the logic to edit a recipe
    console.log('Editing recipe with id:', recipeId);
  };

  const handleDelete = (recipeId) => {
    // TODO: Implement the logic to delete a recipe
    console.log('Deleting recipe with id:', recipeId);
  };

  return (
      <div>
        <h2>Admin Edit Recipe List</h2>
        <div className="recipe-list">
          {recipes.map((recipe) => (
              <Card key={recipe._id} style={{ width: '18rem', marginBottom: '10px' }}>
                <Card.Body>
                  {/* The Card.Title and Card.Text will depend on what details you want to show for each recipe */}
                  <Card.Title>{recipe.name}</Card.Title>
                  {/* More recipe details here */}
                  <Button variant="primary" onClick={() => handleEdit(recipe._id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(recipe._id)}>Delete</Button>
                </Card.Body>
              </Card>
          ))}
        </div>
      </div>
  );
};

export default AdminEditRecipeList;
