import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from '../components/Jumbotron';
import './noMatch.css';

const NoMatch: React.FC = () => (
  <Container
    fluid={true}
    className="text-center no-match d-flex align-items-center justify-content-center"
  >
    <Jumbotron className="w-50" variant="danger">
      <h1>404</h1>
      <br />
      <h2>Page not found.</h2>
    </Jumbotron>
  </Container>
);

export default NoMatch;
