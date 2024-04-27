import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/Recipes';

const FeaturedRecipe = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);

  // Subscribe to 'recipes' publication and fetch recipes with rating >= 3.5
  const recipes = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    if (subscription.ready()) {
      const fetchedRecipes = Recipes.collection.find({ rating: { $gte: 3.5 } }).fetch();
      console.log(fetchedRecipes);
      return fetchedRecipes;
    }
    return [];
  });

  const handleShowRandomRecipe = () => {
    // Select a random recipe from the fetched recipes
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const selectedRecipe = recipes[randomIndex];
      setRandomRecipe(selectedRecipe);
    }
  };

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
            <Button variant="primary" onClick={handleShowRandomRecipe}>View Recipe</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default FeaturedRecipe;
