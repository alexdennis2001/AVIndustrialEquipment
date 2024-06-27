import { Container, Stack  } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { EnvelopeFill, GeoFill, TelephoneFill  } from 'react-bootstrap-icons';
import Footer from '../components/Footer/Footer';

function Contact() {
    return (
      <div>
      <Header/>
      <Container fluid className='main-container pt-2 pb-3'>
      <Row className="justify-content-md-center">
        <Col xs lg="4" sm={8} className='p-3'>
          <h5 class="fw-bold">Get In Touch With Us!</h5>
          <Stack gap={5} className='pt-3'>
            <div>
            <Stack direction="horizontal" gap={3}>
              <GeoFill color="black" size={28} />
              <h5>Address</h5>
            </Stack>
              <h6 style={{marginLeft:"45px"}}>El Paso, Texas</h6>
            </div>
            <div>
            <Stack direction="horizontal" gap={3}>
              <EnvelopeFill color="black" size={28} />
              <h5>Email</h5>
            </Stack>
              <h6 style={{marginLeft:"45px"}}><a href="mailto:avindustrialequipment@outlook.com">avindustrialequipment@outlook.com</a></h6>
            </div>
            <div>
            <Stack direction="horizontal" gap={3}>
              <TelephoneFill color="black" size={28} />
              <h5>Phone</h5>
            </Stack>
              <h6 style={{marginLeft:"45px"}}>+1 (915) 258 2916</h6>
            </div>
          </Stack>
        </Col>
        <Col xs lg="4" sm={8}>
        <Container className='text-white' style={{background:"#414441", borderRadius:"10px"}}>
            <Form className='px-2 py-2'>
              <h4>Contact Us</h4>
              <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="fullName" placeholder="Enter your full name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <div className="d-grid gap-2 pb-1">
                <Button variant="secondary" type='submit' size="md">
                  Send
                </Button>
              </div>
              

            </Form>
          </Container>
        </Col>
      </Row>
      </Container>
      <Footer />

    </div>
    );
  }
  
  export default Contact;
  