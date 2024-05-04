import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import App from '../../ui/layouts/App.jsx';
import { Recipes } from '../../api/recipes/Recipes';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root'),
  );
  root.render(<App />);
});

Meteor.methods({
  'recipes.remove'(recipeId) {
    // Check if the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to delete this recipe.');
    }

    // Check if the recipeId is a string
    check(recipeId, String);

    // Get the current user's email
    const userEmail = Meteor.user().emails[0].address;

    // Check if the recipe exists
    const recipe = Recipes.collection.findOne(recipeId);
    if (!recipe) {
      throw new Meteor.Error('not-found', 'Recipe not found.');
    }

    // Check if the current user is the owner of the recipe
    if (recipe.email !== userEmail) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to delete this recipe.');
    }

    // Remove the recipe
    Recipes.collection.remove(recipeId);
  },
});
