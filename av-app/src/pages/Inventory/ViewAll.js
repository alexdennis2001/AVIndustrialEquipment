import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Button, Spinner } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Header from '../../components/Header/Header';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

function ViewAll() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 256;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        console.log('Total items:', response.data.length);
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

  // Calculate the current page slice
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Header/>
      <Container fluid className='main-container pt-2'>
        {isLoading ?
        <Container className='text-center p-5'>
          <Spinner animation="border" variant="primary" role="status" style={{width: 50, height: 50}}/>
        </Container> : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {currentData.map((item, idx) => (
              <Col key={idx}>
                <Card style={{ width: '18rem', height: '34rem' }}>
                  <Card.Img variant="top" src={item.image} height={200} width={200}/>
                  <Card.Body>
                    <Card.Title as={'h6'}>{item.title}</Card.Title>
                    <Card.Text as={'h6'}><b>Stock #</b> {item.stock_num}</Card.Text>
                    <Card.Text as={'h6'}><b>Type: </b>{item.type}</Card.Text>
                  </Card.Body>
                  <Card.Footer >
                    <Row className='g-2'>
                      <Button variant="success">MAKE AN OFFER</Button>
                      <Button variant="outline-warning" style={{color: 'black'}}>Request Quote</Button>
                      <Button onClick={handleShow} variant="primary">View Details</Button>
                    </Row> 
                    {/* as={Link} to={`/inventory/details/${item.stock_num}`}  */}
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

      <Offcanvas show={show} onHide={handleClose} placement='end' style={{ width: '75%'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default ViewAll;
