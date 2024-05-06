import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/Recipes';
import { Ratings } from '../../api/ratings/Ratings';
import LoadingSpinner from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';

const RecipePageMockup = () => {
  // Get the ID from the URL field.
  const { _id } = useParams();
  // const recId = _id;
  const { /* userInfo, */ rec, rev, ready } = useTracker(() => {
    const subscriptionRecipe = Meteor.subscribe(Recipes.userPublicationName);
    const subscriptionRating = Meteor.subscribe(Ratings.userPublicationName);
    const rdy = subscriptionRecipe.ready() && subscriptionRating.ready();
    // const subscriptionUser = Meteor.subscribe(Users.userPublicationName);
    // const user = Meteor.user();
    // const userInf = Users.collection.findOne({ email: user.username });
    // const userRdy = subscriptionUser.ready();
    const rating = Ratings.collection.find({ recipeId: _id }).fetch();
    const recipe = Recipes.collection.findOne(_id);
    return {
      rec: recipe,
      rev: rating,
      ready: rdy,
    };
  }, [_id]);
  return ready ? (
    <>
      <h1 className="text-center mt-2">{rec.name}</h1>
      <h3 className="text-center mb-4">Rating: {rec.rating}/5</h3>
      <Container>
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5>Description</h5>
                <Card.Text>{rec.description}</Card.Text>
                <h5>Ingredients</h5>
                <ListGroup variant="flush">
                  {rec.ingredients.map((ingredient, idx) => (
                    <ListGroup.Item key={idx}>
                      {ingredient.quantity} {ingredient.name} - ${ingredient.price.toFixed(2)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <h5>Instructions</h5>
                <Card.Text className="mt-3">{rec.instructions}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <div style={{ maxWidth: '100%', maxHeight: '400px' }}>
              <img
                src={`../${rec.picture}`}
                alt={rec.name}
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          { rec && rec._id && <StarRating recipeId={rec._id} /> }
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />;
};

export default RecipePageMockup;
