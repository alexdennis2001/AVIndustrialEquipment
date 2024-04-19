import { Container, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import { TelephoneInboundFill } from 'react-bootstrap-icons';
import AVLogo from '../../img/AVLogo.png';
import ValaSportsLogo from '../../img/ValaSportsLogo.png';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <Container fluid>
      <Row className="header-logos text-white align-items-center text-center">
        <Col>
          <Container className='d-flex align-items-center'>
              <TelephoneInboundFill color="white" size={28} />
              <h3 className="ms-3 mb-0">915-258-2916</h3>
          </Container>
        </Col>

        <Col xs={6}>
          <Container className='d-flex align-items-center justify-content-center gap-3'>
            <img src={AVLogo} alt="AV Logo" />
            <div className='header-text'>
              <h1>Industrial</h1>
              <h1 style={{ color: '#DAB85A' }}>Equipment</h1>
            </div>
          </Container>
        </Col>

        <Col>
          <div className='img-container pe-3'>
            <img src={ValaSportsLogo} alt="Vala Sports Logo" />
          </div>
        </Col>

      </Row>
      <Row>
        <Navbar expand="lg" className="custom-navbar" sticky="top" >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto">
            <NavDropdown title="INVENTORY" id="basic-nav-dropdown" >
              <Link to="action/3.1" className="dropdown-item">Browse by Type</Link>
              <Link to="action/3.2" className="dropdown-item">Browse by Brand</Link>
              <NavDropdown.Divider />
              <Link to="action/3.3" className="dropdown-item">View All</Link>
              </NavDropdown>  
              <Nav.Link as={Link} to="/about" className='text-uppercase'>About</Nav.Link>
              <Nav.Link as={Link} to="/contact" className='text-uppercase'>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  );
}

export default Header;