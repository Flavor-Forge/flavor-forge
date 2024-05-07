import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RatingsCollection {
  constructor() {
    this.name = 'RatingsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      userId: { type: String },
      recipeId: { type: String },
      value: { type: Number, required: true, min: 1, max: 5 },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Method to check if a user has already rated a recipe
  hasUserRated(userId, recipeId) {
    return !!this.collection.findOne({ userId, recipeId });
  }

  // Method to add a new rating
  addRating(userId, recipeId, value) {
    if (this.hasUserRated(userId, recipeId)) {
      throw new Error('User has already rated this recipe.');
    }
    this.collection.insert({ _id: `${userId}_${recipeId}`, userId, recipeId, value }); // Use a composite _id
  }
}

export const Ratings = new RatingsCollection();
