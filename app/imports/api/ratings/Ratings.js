import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RatingsCollection {
  constructor() {
    // The name of this collection
    this.name = 'RatingsCollection';
    // Define the Mongo Collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection
    this.schema = new SimpleSchema({
      value: { type: Number, required: true },
      recipeId: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Ratings = new RatingsCollection();
