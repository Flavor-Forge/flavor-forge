import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Random } from 'meteor/random';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';
import { Recipes } from '../../api/recipes/Recipes';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.map(project => ProfilesProjects.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new project. Error if project already exists.  */
function addProject({ name, homepage, description, interests, picture }) {
  console.log(`Defining project ${name}`);
  Projects.collection.insert({ name, homepage, description, picture });
  interests.map(interest => ProjectsInterests.collection.insert({ project: name, interest }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

<<<<<<< Updated upstream
=======
function addRecipe({ ownerId, recipeId, name, description, ingredients, instructions, picture, rating }) {
  console.log(`Defining recipe: ${name}`);
  Recipes.collection.insert({ ownerId, recipeId, name, description, ingredients, instructions, picture, rating });
}

if (Meteor.settings.defaultRecipes) {
  console.log('Creating default recipes');
  Meteor.settings.defaultRecipes.map(recipe => addRecipe(recipe));
} else {
  console.log('Cannot initialize default recipes! Please provide defaultRecipes in settings.');
}

>>>>>>> Stashed changes
/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProjects && Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default projects');
    Meteor.settings.defaultProjects.map(project => addProject(project));
<<<<<<< Updated upstream
=======
    console.log('Creating the default recipes');
>>>>>>> Stashed changes
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
  jsonData.projects.map(project => addProject(project));
}

function addRecipe({ name, description, ingredients, instructions, picture }) {
  console.log(`Defining recipe: ${name}`);

  // Validate recipe data against the schema (if using SimpleSchema)
  // You can skip this step if data is assumed to be valid

  // Insert the recipe into the Recipes collection
  const createdAt = new Date();
  const recipe = {
    recipeId: Random.id(), // Generate a unique recipe ID
    name,
    description,
    ingredients,
    instructions,
    picture,
    createdAt,
    updatedAt: createdAt,
  };

  Recipes.collection.insert(recipe);

  console.log(`Recipe "${name}" added successfully!`);
}

// Usage example:
if (Meteor.settings.defaultRecipes) {
  console.log('Creating default recipes');
  Meteor.settings.defaultRecipes.map(recipe => addRecipe(recipe));
} else {
  console.log('Cannot initialize default recipes! Please provide defaultRecipes in settings.');
}
