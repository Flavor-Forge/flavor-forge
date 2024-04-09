import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../api/recipes'; // Assuming you have a collection called Recipes

const FeaturedRecipe = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);

  // Fetch recipes with rating 3.5 and above
  const recipes = useTracker(() => {
    return Recipes.find({ rating: { $gte: 3.5 } }).fetch();
  });

  useEffect(() => {
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const selectedRecipe = recipes[randomIndex];
      setRandomRecipe(selectedRecipe);
    }
  }, [recipes]);

  return (
    <Container>
      <h1>Random Recipe</h1>
      {randomRecipe && (
        <Card>
          <Card.Body>
            <Card.Title>{randomRecipe.title}</Card.Title>
            <Card.Text>
              {randomRecipe.description}
              <br />
              Rating: {randomRecipe.rating}
            </Card.Text>
            <Button variant="primary">View Recipe</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default FeaturedRecipe;
