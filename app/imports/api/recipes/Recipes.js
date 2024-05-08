// collections.js (or any server-side file)
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RecipesCollection {
  constructor() {
    this.name = 'RecipesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      email: { type: String }, // email of the user who owns the recipe
      recipeId: { type: String, index: true, unique: true }, // Unique identifier for the recipe
      _id: String,
      name: { type: String, index: true },
      description: { type: String, optional: true },
      ingredients: { type: Array },
      'ingredients.$': { type: Object },
      'ingredients.$.name': { type: String },
      'ingredients.$.quantity': { type: String },
      'ingredients.$.price': { type: Number, min: 0 },
      instructions: { type: String },
      picture: { type: String, optional: true },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        optional: true,
        defaultValue: 0,
        // Custom validation function to ensure the rating value is between 0 and 5
        custom() {
          if (this.value < 0 || this.value > 5) {
            return 'Rating must be between 0 and 5';
          }
          return undefined;
        },
      },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Recipes = new RecipesCollection();

Recipes.collection.allow({
  insert(userId) {
    // Allow insertion if the user is logged in
    return !!userId;
  },
});
