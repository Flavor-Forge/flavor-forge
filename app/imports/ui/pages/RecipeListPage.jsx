import React, { useState } from 'react';
import { Container, Card, Image, Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipes/Recipes';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import LoadingSpinner from '../components/LoadingSpinner';

function getRecipeData(recipeName) {
  const recipe = Recipes.collection.findOne({ name: recipeName });
  return recipe;
}

const MakeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={recipe.picture} width={200} />
        <Card.Title>
          <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{recipe.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

const RecipesListPage = () => {
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState(1); // 1 for ascending, -1 for descending

  const handleChange = (e) => {
    setFilterValue(e.target.value);
  };

  const { ready } = useTracker(() => {
    const sub1 = Meteor.subscribe(Recipes.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);

  const recipes = Recipes.collection.find().fetch();
  let filteredRecipes = recipes;

  if (filterValue) {
    filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(filterValue.toLowerCase()));
  }

  const sortedRecipes = filteredRecipes.sort((a, b) => a.name.localeCompare(b.name) * sortOrder);

  const recipeData = sortedRecipes.map(recipe => getRecipeData(recipe.name));

  const handleSortAlphabetically = () => {
    setFilterValue('');
    setSortOrder(1); // Set to ascending order
  };

  const handleSortReverseAlphabetically = () => {
    setFilterValue('');
    setSortOrder(-1); // Set to descending order
  };

  return ready ? (
    <Container id={PageIDs.recipesPage} style={pageStyle}>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search recipes"
            value={filterValue}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-end align-items-center">
          <Button variant="primary" className="me-2" onClick={handleSortAlphabetically}>Sort Alphabetically</Button>
          <Button variant="primary" onClick={handleSortReverseAlphabetically}>Sort Reverse Alphabetically</Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-2">
        {recipeData.map((recipe, index) => <MakeCard key={index} recipe={recipe} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};
export default RecipesListPage;
