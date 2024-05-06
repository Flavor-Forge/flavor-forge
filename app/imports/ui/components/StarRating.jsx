import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';

const StarRating = ({ recipeId }) => {
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const { recipe, ratings } = useTracker(() => {
    const recipeSubs = Meteor.subscribe(Recipes.userPublicationName);
    const ratingsSubs = Meteor.subscribe(Ratings.userPublicationName);
    const rdy = recipeSubs.ready() && ratingsSubs.ready();
    const rec = Recipes.collection.find({ _id: recipeId }).fetch();
    const rat = Ratings.collection.find({ recipeId: recipeId }).fetch();
    console.log(rat);
    return {
      recipe: rec,
      ratings: rat,
      ready: rdy,
    };
  }, []);

  const handleRatingChange = (newRating) => {
    console.log(newRating);
    Meteor.call('Ratings.addRating', { value: newRating, recipeId: recipeId });
  };
  useEffect(() => {
    if (recipe) {
      console.log(recipeId);
    }
    if (recipe && recipe.rating) {
      setRating(recipe.rating);
    }
  }, [recipe]);

  useEffect(() => {
    if (ratings && ratings.length > 0) {
      const ratingSum = ratings.reduce((sum, a) => sum + a, 0);
      const averageRating = ratingSum / ratings.length;
      console.log(averageRating);
      Meteor.call('Recipes.updateRating', { _id: recipeId, rating: averageRating }, (error) => {
        if (error) {
          console.log('Error updating ratings', error.reason);
        } else {
          console.log('Rating uploaded successfully');
        }
      });
    }
  }, [ratings]);

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
