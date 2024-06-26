import { Container, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import { TelephoneInboundFill } from 'react-bootstrap-icons';
import AVLogo from '../../img/AVLogo.png';
import ValaSportsLogo from '../../img/ValaSportsLogo.png';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <Container fluid>
      <Row className="header-logos text-white align-items-center text-center pt-1">
        <Col xs={4}>
          <Container className='d-flex align-items-center cell-phone'>
              <TelephoneInboundFill color="white" size={24} />
              <h5 className="ms-3 mb-0">+1 (915) 258 2916</h5>
          </Container>
        </Col>

        <Col xs={4}>
            <Container className='d-flex align-items-center justify-content-center'>
              <Link to="/" className='d-flex gap-3' style={{ textDecoration: 'none' }}>
                  <img src={AVLogo} height={80} alt="AV Logo" />
                  <div className='header-text'>
                    <h1 style={{color: '#FFFFFF'}}>Industrial</h1>
                    <h1 style={{color: '#DAB85A' }}>Equipment</h1>
                  </div>
              </Link>
            </Container>
        </Col>

        <Col xs={4}>
          <div className='img-container pe-3'>
            <img src={ValaSportsLogo} height={80} alt="Vala Sports Logo" />
          </div>
        </Col>

      </Row>
      <Row>
        <Navbar expand="lg" className="custom-navbar" sticky="top" >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto">
            <NavDropdown title="INVENTORY" id="basic-nav-dropdown" >
              <Link to="/inventory/byType" className="dropdown-item">Browse by Type</Link>
              <Link to="/inventory/byBrand" className="dropdown-item">Browse by Brand</Link>
              <NavDropdown.Divider />
              <Link to="/inventory/viewAll" className="dropdown-item">View All</Link>
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