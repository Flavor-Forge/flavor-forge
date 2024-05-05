import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

class RecipesCollection {
  constructor() {
    this.name = 'RecipesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      email: { type: String }, // email of the user who owns the recipe
      recipeId: { type: String, index: true, unique: true }, // Unique identifier for the recipe
      name: { type: String, index: true },
      description: { type: String, optional: true },
      ingredients: { type: Array },
      'ingredients.$': { type: Object },
      'ingredients.$.name': { type: String },
      'ingredients.$.quantity': { type: String },
      'ingredients.$.price': { type: Number, min: 0 },
      instructions: { type: String },
      picture: { type: String, optional: true },
      rating: { type: Number, min: 0, max: 5, optional: true, defaultValue: 0 },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  updateRecipe(recipeId, updatedRecipe) {
    return this.collection.update({ recipeId }, { $set: updatedRecipe });
  }
}

export const Recipes = new RecipesCollection();

// Allow and deny rules for security
Recipes.collection.allow({
  insert(userId) {
    return !!userId;
  },
  update(userId, doc) {
    // allow update if user is logged in and is the recipe owner
    return doc.email === Meteor.user()?.email;
  },
});

// Meteor methods for recipe manipulation
Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'recipes.update'(recipeId, updatedRecipe) {
    new SimpleSchema({
      recipeId: { type: String },
      name: { type: String },
      description: { type: String, optional: true },
      ingredients: { type: Array, optional: true },
      'ingredients.$': { type: Object },
      'ingredients.$.name': { type: String },
      'ingredients.$.quantity': { type: String },
      'ingredients.$.price': { type: Number, min: 0 },
      instructions: { type: String },
    }).validate({ recipeId, ...updatedRecipe });

    return Recipes.updateRecipe(recipeId, updatedRecipe);
  },
});
