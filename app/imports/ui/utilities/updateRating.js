import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';

export const updateRating = (rating, recipeId) => {
  const rev = Ratings.collection.find().fetch();
  const recipeRatings = rev.filter(review => review.recipeId === recipeId);
  const ratingArr = recipeRatings.map(recipe => recipe.rating);
  const sumRatings = ratingArr.reduce((partialSum, a) => partialSum + a, rating);
  const averageRating = sumRatings / (recipeRatings.length + 1);

  Recipes.collection.update(
    { _id: recipeId },
    { $set: { rating: averageRating } },
  );
};
