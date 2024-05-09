import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';
import { Users } from '../../api/users/Users';

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

Meteor.publish(Recipes.userPublicationName, () => Recipes.collection.find());

Meteor.publish(Ratings.userPublicationName, () => Ratings.collection.find());

Meteor.publish(Users.userPublicationName, () => Users.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
