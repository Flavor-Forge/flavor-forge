import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Recipes } from '../../api/recipes/Recipes';

const FeaturedRecipe = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);

  // Subscribe to 'recipes' publication and fetch recipes with rating >= 3.5
  const recipes = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    if (subscription.ready()) {
      const fetchedRecipes = Recipes.collection.find({ rating: { $gte: 3.5 } }).fetch();
      return fetchedRecipes;
    }
    return [];
  });

  // Use a separate state to store the initial random recipe
  useEffect(() => {
    if (recipes.length > 0 && !randomRecipe) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const selectedRecipe = recipes[randomIndex];
      setRandomRecipe(selectedRecipe);
    }
  }, [recipes]); // This effect runs only once when 'recipes' changes

  return (
    <Container className="text-center">
      <h1>Random Recipe</h1>
      {randomRecipe ? (
        <Link to={`/recipe/${randomRecipe._id}`}>
          <Card className="mx-auto">
            <Card.Body>
              <Card.Title className="mx-auto">{randomRecipe.name}</Card.Title>
              <Card.Text>
                <Image src={randomRecipe.picture} width={400} className="rounded" />
                <br />
                {randomRecipe.description}
                <br />
                Rating: {randomRecipe.rating}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ) : (
        <p>No random recipe available.</p>
      )}
    </Container>
  );
};

export default FeaturedRecipe;
