import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';
import { Recipes } from '../../api/recipes/Recipes';

/* eslint-disable no-console */

// Create a user with optional admin role
const createUser = (email, password, role) => {
  console.log(`Creating user ${email}.`);
  const userID = Accounts.createUser({ email, password });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// Define an interest with upsert to avoid duplicates
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

// Create a user profile and associate it with interests and projects
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile for ${email}`);
  createUser(email, 'password', role); // Assuming default password should be replaced or generated securely
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
  interests.forEach(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.forEach(project => ProfilesProjects.collection.insert({ profile: email, project }));
  interests.forEach(interest => addInterest(interest));
}

// Add a new project
function addProject({ name, homepage, description, interests, picture }) {
  console.log(`Defining project ${name}`);
  Projects.collection.insert({ name, homepage, description, picture });
  interests.forEach(interest => ProjectsInterests.collection.insert({ project: name, interest }));
  interests.forEach(interest => addInterest(interest));
}

// Add a recipe to the collection
function addRecipe({ email, recipeId, name, description, ingredients, instructions, picture, rating }) {
  console.log(`Defining recipe: ${name}`);
  Recipes.collection.insert({ email, recipeId, name, description, ingredients, instructions, picture, rating });
}

// Initialize the database with default data if empty
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    Meteor.settings.defaultRecipes.forEach(recipe => addRecipe(recipe));
  } else {
    console.log('No default recipes provided in settings.');
  }

  if (Meteor.settings.defaultProjects && Meteor.settings.defaultProfiles && Meteor.settings.defaultAccounts) {
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
    Meteor.settings.defaultProjects.forEach(project => addProject(project));
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Missing default data settings.');
  }
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
