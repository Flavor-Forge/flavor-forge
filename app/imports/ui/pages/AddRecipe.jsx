import React, { useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
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
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddRecipe = () => {
  const [ingredientFields, setIngredientFields] = useState([{ name: '', quantity: '', price: 0.0 }]);

  const addIngredientField = () => {
    setIngredientFields([...ingredientFields, { name: '', quantity: '', price: 0.0 }]);
  };

  const removeIngredientField = index => {
    const updatedIngredients = [...ingredientFields];
    updatedIngredients.splice(index, 1);
    setIngredientFields(updatedIngredients);
  };

  const submit = async (data, formRef) => {
    const { name, description, instructions, picture } = data;
    const email = Meteor.user().emails[0].address;
    const recipeId = generateRecipeId();
    const defaultRating = 0;

    try {
      await Recipes.collection.insert({
        email,
        recipeId,
        name,
        description,
        ingredients: ingredientFields.map(({ ingredientName, quantity, price }) => ({ ingredientName, quantity, price })),
        instructions,
        picture,
        rating: defaultRating,
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
                {ingredientFields.map((ingredient, index) => (
                  <div key={index}>
                    <TextField name={`ingredients.${index}.name`} label={`Ingredient Name ${index + 1}`} />
                    <TextField name={`ingredients.${index}.quantity`} label={`Quantity ${index + 1}`} />
                    <NumField name={`ingredients.${index}.price`} label={`Price ${index + 1}`} decimal />
                    <Button variant="danger" onClick={() => removeIngredientField(index)}>Remove</Button>
                  </div>
                ))}
                <Button variant="secondary" onClick={addIngredientField}>Add Ingredient</Button>
                <TextField name="instructions" />
                <TextField name="picture" label="Picture (URL address)" />
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
