import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipes/Recipes';

/* const generateRecipeId = () => {
  // Generate a random alphanumeric string
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10; // Adjust the length as needed
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}; */

const formSchema = new SimpleSchema({
  name: String,
  description: { type: String, optional: true },
  ingredients: { type: Array },
  'ingredients.$': { type: Object },
  'ingredients.$.name': { type: String },
  'ingredients.$.quantity': { type: String },
  'ingredients.$.price': { type: Number, min: 0 },
  instructions: { type: String },
  picture: { type: String, optional: true },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    optional: true,
    defaultValue: 0,
    // Custom validation function to ensure the rating value is between 0 and 5
    custom() {
      if (this.value < 0 || this.value > 5) {
        return 'Rating must be between 0 and 5';
      }
      return undefined;
    },
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddRecipe = () => {
  /* const submit = async (data, formRef) => {
    const { name, description, ingredients, instructions, rating, picture } = data;
    const email = Meteor.user().emails[0].address;
    const recipeId = generateRecipeId();

    try {
      // No need to upload the picture since it's already a URL
      await Recipes.collection.insert({
        email,
        recipeId,
        _id,
        name,
        description,
        ingredients,
        instructions,
        picture,
        rating,
      });

      swal('Success', 'Recipe added successfully', 'success');
      formRef.reset();
    } catch (error) {
      swal('Error', error.message, 'error');
    }
  }; */
  const submit = (data, formRef) => {
    const { name, description, ingredients, instructions, rating, picture } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert(
      { name, description, ingredients, instructions, rating, picture, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Col className="text-center"><h2>Add Recipe</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <TextField name="description" />
                <TextField name="ingredients.0.name" label="Ingredient Name" />
                <TextField name="ingredients.0.quantity" label="Quantity" />
                <NumField name="ingredients.0.price" label="Price" decimal />
                <TextField name="instructions" />
                <TextField name="picture" label="Picture (URL address)" />
                <NumField name="rating" decimal />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
