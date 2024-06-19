import { Container } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AV_PP from '../img/AV_PP.png';
import './css/About.css';

function About() {
  return (
    <div>
      <Header/>
      <Container fluid className='main-container pt-1 pb-3'>
        <Row className="text-center">
          <h2>About Us</h2>
          <h1 style={{ fontFamily: 'fantasy'}}>AV INDUSTRIAL EQUIPMENT</h1>
        </Row>
        <Row className='justify-content-center'>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Container className='card-container'>
                  <Row>
                    <Col className='text-center'>
                      <img src={AV_PP} alt="AV" />
                      <h3 className='pt-3 fw-bold'>Armando Valadez</h3>
                      <h6>Certified FIBA Agent</h6>
                    </Col>
                    <Col className='me-5'>
                      <p>
                        At <b>AV Industrial Equipment</b>, we bridge the machinery needs between the United States and Mexico, offering premium industrial machinery to enhance productivity and innovation. We specialize in offering a diverse range of machinery for metalworking, woodworking, plastics, and more, catering to various manufacturing industries. Our commitment extends beyond quality equipment; we prioritize customer satisfaction, ensuring each client finds the ideal machinery for their specific needs and budget.
                      </p>
                      <p>
                        Our bilingual team simplifies the process for our clients, making the acquisition of US machinery seamless, fostering international cooperation, and supporting the growth of robust manufacturing sectors capable of global competition. Trust, reliability, and an in-depth understanding of the industrial landscapes in both countries are the cornerstones of our business.
                      </p>
                      <p>
                        Choose AV Industrial Equipment for a partnership that guarantees quality machinery and genuine customer care, paving the way for your operational success. Welcome to a world where machinery meets opportunity — welcome to AV Industrial Equipment.
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
}

export default About;
