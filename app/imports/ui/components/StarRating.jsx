import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '/imports/api/recipes/Recipes';
import StarRatings from 'react-star-ratings';

const StarRating = ({ recipeId }) => {
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const recipe = useTracker(() => {
    return Recipes.findOne(recipeId);
  });

  useEffect(() => {
    if (recipe && recipe.rating) {
      setRating(recipe.rating);
    }
  }, [recipe]);

  const handleRatingChange = (newRating) => {
    Recipes.updateRating(recipeId, newRating);
  };

  return (
    <div>
      <h2>Rate This Recipe:</h2>
      <StarRatings
        rating={rating} // Current rating value
        starRatedColor="orange" // Color of filled stars
        changeRating={handleRatingChange} // Callback function to handle rating changes
        numberOfStars={5} // Total number of stars to display
        name="rating" // Name for the rating input (useful for forms)
      />
      <p>Selected Rating: {rating}</p>
    </div>
  );
};

export default StarRating;