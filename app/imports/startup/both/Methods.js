import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profiles } from '../../api/profiles/Profiles';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

Meteor.methods({
  'Recipes.updateEdit'({ recipeId, name, description, ingredients, instructions }) {
    check(recipeId, String);
    check(name, String);
    check(description, String);
    check(ingredients, [Object]); // Validate that ingredients is an array of objects
    check(instructions, String);

    // Update the recipe document
    Recipes.collection.update(
      { _id: recipeId },
      {
        $set: {
          name: name,
          description: description,
          ingredients: ingredients,
          instructions: instructions,
        },
      },
      (error) => {
        if (error) {
          throw new Meteor.Error('update-failed', 'Failed to update the recipe.');
        }
      },
    );
  },
});

export const updateRecipeEditMethod = 'Recipes.updateEdit';

const addProfileMethod = 'Profiles.add';

Meteor.methods({
  'Profiles.add'({ email }) {
    Profiles.collection.insert({ email });
  },
});

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, picture }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, bio, picture } });
    // ProfilesInterests.collection.remove({ profile: email });
    // ProfilesProjects.collection.remove({ profile: email });
    // interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    // projects.map((project) => ProfilesProjects.collection.insert({ profile: email, project }));
  },
});

const addProjectMethod = 'Projects.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
const updateRecipeRatingMethod = 'Recipes.updateRating';

Meteor.methods({
  'Recipes.updateRating'(ratingData) {
    check(ratingData, Object);
    check(ratingData.rating, Number);
    check(ratingData.recipeId, String);
    Recipes.collection.update({ _id: ratingData.recipeId }, { $set: { rating: ratingData.rating } });
    console.log('Rating Data updated', ratingData);
  },
});

const addRatingMethod = 'Ratings.addRating';

Meteor.methods({
  'Ratings.addRating'(ratingData) {
    check(ratingData, Object);
    check(ratingData.value, Number);
    check(ratingData.recipeId, String);
    Ratings.collection.insert({
      value: ratingData.value,
      recipeId: ratingData.recipeId,
    });
  },
});

export { updateProfileMethod, addProjectMethod, updateRecipeRatingMethod, addRatingMethod, addProfileMethod };
