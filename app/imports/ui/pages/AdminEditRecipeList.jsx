import React from 'react';
import swal from 'sweetalert';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipe/Recipes';
// You will need to create or have a schema for Recipes
import RecipeSchema from '../../api/recipe/RecipesSchema';

const bridge = new SimpleSchema2Bridge(RecipeSchema);

const AdminEditRecipeList = () => {
  // useTracker connects Meteor data to React components.
  const { recipes, ready } = useTracker(() => {
    // Subscribe to recipes publication
    const subscription = Meteor.subscribe(Recipes.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the recipes
    const allRecipes = Recipes.collection.find({}).fetch();
    return {
      recipes: allRecipes,
      ready: rdy,
    };
  });

  // Handler for submitting updates to a recipe
  const submit = (data, recipeId) => {
    // Here you would include all the fields you expect to update
    const { title, ingredients, method } = data;
    Recipes.collection.update(recipeId, { $set: { title, ingredients, method } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Recipe updated successfully', 'success')));
  };

  return ready ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          {recipes.map(recipe => (
              <Col xs={12} md={6} lg={4} key={recipe._id}>
                <Card className="mb-3">
                  <Card.Body>
                    <AutoForm schema={bridge} onSubmit={data => submit(data, recipe._id)} model={recipe}>
                      <TextField name="title" />
                      <LongTextField name="ingredients" />
                      <LongTextField name="method" />
                      <SubmitField value="Update Recipe" />
                      <Button variant="danger" onClick={() => {/* Add delete logic here */}}>Delete</Button>
                      <ErrorsField />
                    </AutoForm>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      </Container>
  ) : <LoadingSpinner />;
};

export default AdminEditRecipeList;
