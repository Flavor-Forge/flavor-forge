import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random';

class RecipesCollection {
  constructor() {
    this.name = 'RecipesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      ownerId: { type: String }, // ID of the user who owns the recipe
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
      createdAt: { type: Date },
      updatedAt: { type: Date },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Method to insert a new recipe with owner ID
  insertRecipe(ownerId, recipeData) {
    const createdAt = new Date();
    const recipe = {
      ownerId,
      recipeId: Random.id(), // Generate a unique recipe ID
      createdAt,
      updatedAt: createdAt,
      ...recipeData,
    };
    this.collection.insert(recipe);
  }
}

export const Recipes = new RecipesCollection();
