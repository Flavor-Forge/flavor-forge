import React from 'react';
import swal from 'sweetalert';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipe/Recipes';
// Assume RecipeSchema is your schema from the Recipes collection
import RecipeSchema from '../../api/recipe/RecipesSchema';

const bridge = new SimpleSchema2Bridge(RecipeSchema);

const AdminEditRecipeList = () => {
  const { recipes, ready } = useTracker(() => {
    const subscription = Meteor.subscribe('Recipes.admin');
    return {
      recipes: Recipes.find({}).fetch(),
      ready: subscription.ready(),
    };
  }, []);

  const submit = (recipeId, data) => {
    // Here, 'data' contains the updated recipe fields
    Recipes.update(recipeId, { $set: data }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Recipe updated successfully', 'success');
      }
    });
  };

  const remove = (recipeId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this recipe!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Recipes.remove(recipeId);
        swal("Poof! Your recipe has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your recipe is safe!");
      }
    });
  };

  return (
      <Container className="py-3">
        <Row className="justify-content-center">
          {ready ? (
              recipes.map((recipe) => (
                  <Col xs={12} md={6} lg={4} key={recipe._id}>
                    <Card className="mb-3">
                      <Card.Body>
                        <AutoForm schema={bridge} model={recipe} onSubmit={(data) => submit(recipe._id, data)}>
                          <TextField name="title" />
                          <LongTextField name="description" />
                          <LongTextField name="ingredients" />
                          {/* Add other fields as necessary */}
                          <SubmitField value="Update" />
                          <Button variant="danger" onClick={() => remove(recipe._id)}>Delete</Button>
                          <ErrorsField />
                        </AutoForm>
                      </Card.Body>
                    </Card>
                  </Col>
              ))
          ) : (
              <LoadingSpinner />
          )}
        </Row>
      </Container>
  );
};

export default AdminEditRecipeList;
