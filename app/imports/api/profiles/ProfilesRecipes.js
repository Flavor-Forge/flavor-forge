import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for the ProfilesRecipes collection. */
class ProfilesRecipesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesRecipesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profile: String,
      recipe: String,
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const ProfilesRecipes = new ProfilesRecipesCollection();
