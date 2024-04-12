import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import Profiles from '../pages/Profiles';
import Projects from '../pages/Projects';
import Interests from '../pages/Interests';
import Filter from '../pages/Filter';
import AddProject from '../pages/AddProject';
import RecipesPage from '../pages/MockRecipePage';

const defaultRecipes = [
  {
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta.',
    ingredients: [
      { name: 'Spaghetti', quantity: '200g', price: 2.5 },
      { name: 'Pancetta', quantity: '100g', price: 3.0 },
      { name: 'Eggs', quantity: '2', price: 1.0 },
      { name: 'Parmesan cheese', quantity: '50g', price: 2.0 },
      { name: 'Black pepper', quantity: 'to taste', price: 0.5 },
    ],
    instructions: 'Cook spaghetti until al dente. Meanwhile, fry pancetta until crispy. Whisk eggs and cheese together. Drain spaghetti and toss with egg mixture, pancetta, and pepper.',
    picture: 'https://example.com/spaghetti_carbonara.jpg',
  },
];

/* Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<RecipesPage recipes={defaultRecipes} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/filter" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
        <Route path="/addproject" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <HomePage />,
};

export default App;
