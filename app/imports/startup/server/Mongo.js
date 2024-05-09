import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Profiles } from '../../api/profiles/Profiles';
import { Recipes } from '../../api/recipes/Recipes';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    email: email, // Use email as username
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, picture, email });
  // Add interests and projects.
  // interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  // projects.map(project => ProfilesProjects.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  // interests.map(interest => addInterest(interest));
}

function addRecipe({ email, recipeId, name, description, ingredients, instructions, picture, rating }) {
  console.log(`Defining recipe: ${name}`);
  Recipes.collection.insert({ email, recipeId, name, description, ingredients, instructions, picture, rating });
}
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default recipes');
    Meteor.settings.defaultRecipes.map(recipe => addRecipe(recipe));
  } else {
    console.log('Cannot initialize default recipes! Please provide defaultRecipes in settings.');
  }
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProjects && Meteor.settings.defaultProfiles && Meteor.settings.defaultAccounts) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}

// Meteor methods for recipe management
Meteor.methods({
  'recipes.findOne': function (recipeId) {
    check(recipeId, String);
    const recipe = Recipes.collection.findOne({ _id: recipeId });
    if (!recipe) {
      throw new Meteor.Error('not-found', 'Recipe not found');
    }
    return recipe;
  },
  'recipes.update': function (recipeId, updatedRecipe) {
    check(recipeId, String);
    check(updatedRecipe, Object); // Further checks can be added based on recipe schema
    return Recipes.collection.update({ _id: recipeId }, { $set: updatedRecipe });
  },
  'recipes.remove': function (recipeId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action.');
    }
    check(recipeId, String);
    const recipe = Recipes.collection.findOne({ _id: recipeId });
    if (!recipe) {
      throw new Meteor.Error('not-found', 'Recipe not found.');
    }
    return Recipes.collection.remove({ _id: recipeId });
  },
});
