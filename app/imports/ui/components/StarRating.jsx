import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';

const StarRating = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  const { ratings } = useTracker(() => {
    const recipeSubs = Meteor.subscribe(Recipes.userPublicationName);
    const ratingsSubs = Meteor.subscribe(Ratings.userPublicationName);
    const rdy = recipeSubs.ready() && ratingsSubs.ready();
    const rec = Recipes.collection.find({ _id: recipeId }).fetch(); // Use _id instead of recipeId
    const rat = Ratings.collection.find({ recipeId: recipeId }).fetch(); // Use recipeId as a filter
    console.log(rat);
    return {
      recipe: rec,
      ratings: rat,
      ready: rdy,
    };
  });

  const handleRatingChange = (newRating) => {
    console.log(newRating, ratings, '***');
    Meteor.call('Ratings.addRating', { value: newRating, recipeId: recipeId });
    setRating(newRating);
    if (ratings && ratings.length > 0) {
      const ratingSum = ratings.reduce((acc, curr) => acc + curr.value, 0) + newRating;
      const averageRating = ratingSum / (ratings.length + 1);
      console.log(averageRating, 'updated rating');
      Meteor.call('Recipes.updateRating', { recipeId: recipeId, rating: averageRating });
    }
  };

  return (
    <div>
      <h2>Rate This Recipe:</h2>
      <StarRatings
        rating={rating}
        starRatedColor="orange"
        changeRating={handleRatingChange}
        numberOfStars={5}
        name="rating"
      />
      <p>Selected Rating: {rating}</p>
    </div>
  );
};

StarRating.propTypes = {
  recipeId: PropTypes.string.isRequired,
};

export default StarRating;
