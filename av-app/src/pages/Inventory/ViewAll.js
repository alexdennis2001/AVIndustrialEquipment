import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

function ViewAll() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 240;

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
    setIsLoading(true);  // Set loading true to trigger loading state
    window.scrollTo(0, 0);  // Scroll to the top of the page
    setCurrentPage(pageNumber);
    setIsLoading(false);  // Set loading false once the page number has been set
  };

  // Calculate the current page slice
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Header/>
      <Container fluid className='main-container pt-2'>
        {isLoading ? <p>Loading...</p> : (
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
                      <Button as={Link} to={`/inventory/details/${item.stock_num}`} variant="primary">View Details</Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Pagination className="justify-content-center py-3">
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
    </div>
  );
}

export default ViewAll;
