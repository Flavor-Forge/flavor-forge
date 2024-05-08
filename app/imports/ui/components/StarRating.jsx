import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';

const StarRating = ({ recipeId }) => {
  const [rating] = useState(0); // State to hold the selected rating
  const { ratings } = useTracker(() => {
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
    console.log(newRating, ratings, '***');
    Meteor.call('Ratings.addRating', { value: newRating, recipeId: recipeId });
    if (ratings && ratings.length > 0) {
      const ratingSum = ratings.reduce((acc, curr) => acc + curr.value, 0);
      const averageRating = ratingSum / ratings.length;
      console.log(averageRating, 'updated rating');
      Meteor.call('Recipes.updateRating', { recipeId: recipeId, rating: averageRating });
    }
  };

  return (
    <div>
      <h2>Rate This Recipe:</h2>
      <StarRatings
        rating={newRating}
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
