import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Outlet, useMatch } from 'react-router-dom';
import './layout.css';

const Layout: React.FC = () => {
  const relationshipsMatch = useMatch('/relationships/*');

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex flex-column flex-grow-1">
        <Navbar className="border-bottom">
          <Container fluid={true} className="px-5">
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  className="pe-2"
                  src="https://www.hok.com/wp-content/themes/HOK/assets/img/favicon/favicon-32x32.png"
                  alt="HOK Logo"
                />
                <span>HOK ECS</span>
              </Navbar.Brand>
            </LinkContainer>
            <Nav fill={true} className="flex-grow-1">
              <LinkContainer to="/createRelationship">
                <Nav.Link active={false}>Create Relationship</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/relationships">
                <Nav.Link active={Boolean(relationshipsMatch)}>Relationships</Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
        <div className="px-5 py-3 h-100">
          <Outlet />
        </div>
      </div>
      <footer className="flex-shrink-0 px-5 pt-3 border-top">
        <p className="text-muted">Copyright &copy; HOK Group 2023</p>
      </footer>
    </div>
  );
};

export default Layout;
