import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class UsersCollection {
  constructor() {
    this.name = 'UsersCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      username: String,
      password: String,
      image: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.admin`;
  }
}

export const Users = new UsersCollection();
