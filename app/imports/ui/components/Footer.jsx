import React from 'react';
import { Col, Container } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3" style={{ backgroundColor: 'maroon' }}>
    <Container>
      <Col className="text-center" style={{ color: 'white' }}>
        The Lovin Toaster Oven Project
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a
          style={{ color: 'white', textDecoration: 'none' }}
          href="https://flavor-forge.github.io/"
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
          https://flavor-forge.github.io/
        </a>

      </Col>
    </Container>
  </footer>
);

export default Footer;
