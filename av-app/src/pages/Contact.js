import { Container, Stack  } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Contact() {
    return (
      <div>
      <Header/>
      <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2" sm={8}>
          <h2>Get In Touch With Us!</h2>
          <Stack gap={3}>
            <div className="p-2">First item</div>
            <div className="p-2">Second item</div>
            <div className="p-2">Third item</div>
          </Stack>
        </Col>
        <Col xs lg="2" sm={8}>
          3 of 3
        </Col>
      </Row>
      </Container>
    </div>
    );
  }
  
  export default Contact;
  