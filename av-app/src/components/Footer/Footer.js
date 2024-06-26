import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto pt-3 bg-black">
      <Container>
        <Row>
          <Col className="text-center text-white">
            <a href="mailto:avindustrialequipment@outlook.com">avindustrialequipment@outlook.com</a>
            <p className='pt-1'>&copy; {new Date().getFullYear()} AV Industrial Equipment. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
