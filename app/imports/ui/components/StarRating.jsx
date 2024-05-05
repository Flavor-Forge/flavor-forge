import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';

const StarRating = ({ recipeId }) => {
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const { recipe } = useTracker(() => Recipes.collection.find({ recipeId: recipeId }).fetch());
  const { ratings } = useTracker(() => Ratings.collection.find().fetch());

  const handleRatingChange = (newRating) => {
    Meteor.call('Ratings.addRating', newRating, recipeId);
    const recipeRatings = ratings ? ratings.filter(specificRating => specificRating.recipeId === recipeId) : [];
    const ratingArray = recipeRatings.map(ratingsById => ratingsById.rating);
    const ratingSum = ratingArray.reduce((partSum, a) => partSum + a, rating);
    const averageRating = ratingSum / (recipeRatings.length + 1);
    Meteor.call('Recipes.updateRating', recipeId, averageRating, (error) => {
      if (error) {
        console.log('Error updating rating:', error);
      } else {
        console.log('Rating updated successfully');
      }
    });
  };
  useEffect(() => {
    if (recipe) {
      console.log(recipe.recipeId);
    }
    if (recipe && recipe.rating) {
      setRating(recipe.rating);
    }
  }, [recipe]);

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

StarRating.propTypes = {
  recipeId: PropTypes.string.isRequired,
};

export default StarRating;
