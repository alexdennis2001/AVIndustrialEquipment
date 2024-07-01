import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Button, Spinner, Offcanvas, Modal, Form, Image } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import api from '../../api/axiosConfig';
import ImagePlaceholder from '../../img/ImagePlaceHolder.png';
import Footer from '../../components/Footer/Footer';


const states = {
  USA: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  Mexico: [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
    "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City",
    "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
    "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
    "Yucatán", "Zacatecas"
  ]
};

function ViewAll() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 256;

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    company: '',
    streetAddress: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    message: ''
  });

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (product, message, title) => {
    setSelectedProduct(product);
    setModalMessage(message);
    setModalTitle(title);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setTotalPages(Math.ceil(data.length / pageSize));
    }
  }, [data]);

  const fetchData = () => {
    setIsLoading(true);
    api.get(`/api/Products/all`)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
        // console.log('Total items:', response.data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);  // Scroll to the top of the page
  };

  const handleShowOffcanvas = (productId) => {
    api.get(`/api/Products/${productId}`)
      .then(response => {
        setSelectedProduct(response.data);
        setShowOffcanvas(true);
        // console.log(response.data);
      })
      .catch(error => {
        console.error('Error loading product details:', error);
      });
  };

  const predefinedMessage = (product) => `I'm interested in your ${product.title} 

Stock number: ${product.stock_num}`;

  const [stateOptions, setStateOptions] = useState([]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData({ ...formData, country: selectedCountry });
    setStateOptions(states[selectedCountry] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, message: modalMessage };
    try {
      const response = await api.post('/api/Contact/send-email', updatedFormData);
      console.log(response.data);
      alert('Email sent successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };
  

  // Calculate the current page slice
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Header/>
      <Container fluid className='main-container pt-2'>
        {isLoading ?
        <div style={{height: '45vh'}}>
          <Container className='text-center p-5'>
          <Spinner animation="border" variant="primary" role="status" style={{width: 50, height: 50}}/>
        </Container>
        </div>
         : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {currentData.map((item, idx) => (
              <Col key={idx} style={{ textAlign: '-webkit-center' }}>
                <Card className="card-responsive" style={{ width: '18rem', height: '34rem' }}>
                  <Card.Img variant="top" src={item.image && item.image !== "NULL" ? item.image : ImagePlaceholder} className="card-img-responsive" height={200} width={200} />
                  <Card.Body>
                    <Card.Title as={'h6'}>{item.title}</Card.Title>
                    <Card.Text as={'h6'}><b>Stock #</b> {item.stock_num}</Card.Text>
                    <Card.Text as={'h6'}><b>Type: </b>{item.type}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Row className='g-2'>
                      <Button variant="success" onClick={() => handleShowModal(item, `I'd like to make an offer of: $0.00\n\n${predefinedMessage(item)}`, "Make an Offer")}>MAKE AN OFFER</Button>
                      <Button variant="outline-warning" onClick={() => handleShowModal(item, predefinedMessage(item), "Request a Quote")} style={{color: 'black'}}>Request Quote</Button>
                      <Button onClick={() => handleShowOffcanvas(item.stock_num)} variant="primary">View Details</Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Pagination className="justify-content-center pt-3">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map(page => 
            <Pagination.Item 
              key={page + 1} 
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </Pagination.Item>
          )}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </Container>

      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement='end' style={{ width: '75%'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Product Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedProduct ? (
            <div>
              <Container className='text-center pb-3'>
                <Image src={selectedProduct.image && selectedProduct.image !== "NULL" ? selectedProduct.image : ImagePlaceholder} className="img-fluid" style={{maxHeight: '300px', objectFit: 'cover'}}/>
              </Container>
              <Card>
                <Card.Body>
                  <Card.Title as="h4" className='fw-bold'>{selectedProduct.title}</Card.Title>
                  <Row>
                    <Col>
                      <Card.Text as={'h6'}><b>Stock #</b> {selectedProduct.stock_num || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Type: </b> {selectedProduct.type || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Brand: </b> {selectedProduct.brand || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Model: </b> {selectedProduct.model || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Serial Number: </b> {selectedProduct.serial_num || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Condition: </b> {selectedProduct.condition || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Year: </b> {selectedProduct.year || 'N/A'}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Text as={'h6'}><b>City: </b> {selectedProduct.city || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>State: </b> {selectedProduct.state || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Zip Code: </b> {selectedProduct.zipCode || 'N/A'}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row className='g-1'>
                    <Button variant="success" onClick={() => handleShowModal(selectedProduct, `I'd like to make an offer of: $0.00\n\n${predefinedMessage(selectedProduct)}`, "Make an Offer")}>MAKE AN OFFER</Button>
                    <Button variant="outline-warning" onClick={() => handleShowModal(selectedProduct, predefinedMessage(selectedProduct), "Request a Quote")} style={{color: 'black'}}>Request Quote</Button>
                  </Row>
                </Card.Footer>
              </Card>
            </div>
          ) : <p>Loading...</p>}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Row className='pb-3'>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='pb-3'>
                  <Col md={6}>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" name="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='pb-3'>
                  <Col md={6}>
                    <Form.Group controlId="formCompany">
                      <Form.Label>Company</Form.Label>
                      <Form.Control type="text" name="company" placeholder="Enter your company name" value={formData.company} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formStreetAddress">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control type="text" name="streetAddress" placeholder="Enter your street address" value={formData.streetAddress} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='pb-3'>
                  <Col md={6}>
                    <Form.Group controlId="formCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Select name="country" value={formData.country} onChange={handleCountryChange}>
                        <option value="">—Please choose a country—</option>
                        <option value="USA">United States</option>
                        <option value="Mexico">Mexico</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formState">
                      <Form.Label>State</Form.Label>
                      <Form.Select name="state" value={formData.state} onChange={handleChange} disabled={!stateOptions.length}>
                        <option value="" disabled>—Please choose a state—</option>
                        {stateOptions.map((state, idx) => (
                          <option key={idx} value={state}>{state}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='pb-3'>
                  <Col md={6}>
                    <Form.Group controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" name="city" placeholder="Enter your city" value={formData.city} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formZipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="text" name="zipCode" placeholder="Enter your zip code" value={formData.zipCode} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    placeholder="Enter your message"
                    value={modalMessage}
                    onChange={(e) => setModalMessage(e.target.value)}
                    style={{ height: 180 }}
                  />
                </Form.Group>

                
          </Modal.Body>
          <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Footer />
    </div>
  );
}

export default ViewAll;
