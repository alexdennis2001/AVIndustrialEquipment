import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import Header from '../components/Header/Header';
import './css/About.css';
import api from '../api/axiosConfig';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        api.get(`/api/Products/${id}`) // Using Axios for the API call
            .then(response => {
                setProduct(response.data); // Set the product data from response
                console.log(response.data);
            })
            .catch(error => console.error('Error loading product details:', error));
    }, [id]);

  return (
    <div>
      <Header/>
        <Container fluid className='main-container pt-2'>
            {product ? (
            <Container>
                <Row xs={1} sm={1} md={2} lg={2}>
                    <Col>
                        <Container className='text-center'>
                            <Image src={product.image} className="img-fluid" style={{maxHeight: '400px', objectFit: 'cover'}}/>
                        </Container>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title as="h3" className='fw-bold'>{product.title}</Card.Title>
                                <Row>
                                    <Col>
                                        {product.stock_num == null ? <Card.Text as={'h6'}><b>Stock #</b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Stock #</b> {product.stock_num}</Card.Text>
                                        )}

                                        {product.type == null ? <Card.Text as={'h6'}><b>Type: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Type: </b> {product.type}</Card.Text>
                                        )}

                                        {product.brand == null ? <Card.Text as={'h6'}><b>Brand: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Brand: </b> {product.brand}</Card.Text>
                                        )}
                                        {product.model == null ? <Card.Text as={'h6'}><b>Model: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Model: </b> {product.model}</Card.Text>
                                        )}
                                        {product.serial_num == null ? <Card.Text as={'h6'}><b>Serial Number: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Serial Number: </b> {product.serial_num}</Card.Text>
                                        )}

                                        {product.condition == null ? <Card.Text as={'h6'}><b>Condition: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Condition: </b> {product.condition}</Card.Text>
                                        )}

                                        {product.year == null ? <Card.Text as={'h6'}><b>Year: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Year: </b> {product.year}</Card.Text>
                                        )}
                                    </Col>
                                    <Col>
                                        {product.city == null ? <Card.Text as={'h6'}><b>City: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>City: </b> {product.city}</Card.Text>
                                        )}

                                        {product.state == null ? <Card.Text as={'h6'}><b>State: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>State: </b> {product.state}</Card.Text>
                                        )}

                                        {product.zipCode == null ? <Card.Text as={'h6'}><b>Zip Code: </b> N/A</Card.Text>  : (
                                            <Card.Text as={'h6'}><b>Zip Code: </b> {product.zipCode}</Card.Text>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>

                            <Card.Footer >
                                <Row className='g-1'>
                                <Button variant="success">MAKE AN OFFER</Button>
                                <Button variant="outline-warning" style={{color: 'black'}}>Request Quote</Button>
                                </Row>
                            </Card.Footer>
                            
                        </Card>
                    </Col>
                </Row>
                
            </Container>
            ) : <p>Loading...</p>}
        </Container>    
    </div>
  );
}

export default ProductDetails;