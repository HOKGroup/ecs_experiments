import React from 'react';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import BNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useMatch } from 'react-router-dom';

const Navbar: React.FC = () => {
  const relationshipsMatch = useMatch('/relationships');

  return (
    <BNavbar className="border-bottom">
      <Container fluid={true} className="px-5">
        <LinkContainer to="/">
          <BNavbar.Brand>
            <img
              className="pe-2"
              src="https://www.hok.com/wp-content/themes/HOK/assets/img/favicon/favicon-32x32.png"
              alt="HOK Logo"
            />
            <span>HOK ECS</span>
          </BNavbar.Brand>
        </LinkContainer>
        <Nav fill={true} className="flex-grow-1">
          <LinkContainer to="/createRelationship">
            <Nav.Link active={false}>Create Relationship</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/relationships">
            <Nav.Link active={Boolean(relationshipsMatch)}>Relationships</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/createEntity">
            <Nav.Link active={false}>Create Entity</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </BNavbar>
  );
};

export default Navbar;
