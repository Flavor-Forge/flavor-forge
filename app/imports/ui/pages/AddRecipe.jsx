import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import axios from 'axios'; // Import Axios for HTTP requests
import { Recipes } from '../../api/recipes/Recipes';

const generateRecipeId = () => {
  // Generate a random alphanumeric string
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10; // Adjust the length as needed
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

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
  const uploadFile = async (file) => {
    try {
      // Proxy endpoint for uploading images
      const endpoint = '/api/v1_1/image/upload'; // Assuming your proxy endpoint is '/api'

      // FormData object to send file data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      // Send POST request to the proxy endpoint
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      // Return secure URL of the uploaded image
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload picture');
    }
  };

  const submit = async (data, formRef) => {
    const { name, description, ingredients, instructions, rating } = data;
    const email = Meteor.user().emails[0].address;
    const recipeId = generateRecipeId();

    try {
      const pictureUrl = await uploadFile(data.picture);

      await Recipes.collection.insert({
        email,
        recipeId,
        name,
        description,
        ingredients,
        instructions,
        picture: pictureUrl,
        rating,
      });

      swal('Success', 'Recipe added successfully', 'success');
      formRef.reset();
    } catch (error) {
      swal('Error', error.message, 'error');
    }
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
                <input type="file" name="picture" accept="image/png, image/jpeg, image/jpg" />
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
