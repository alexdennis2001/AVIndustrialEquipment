import Header from '../components/Header/Header';
import Button from 'react-bootstrap/Button';
import { Container, Stack } from 'react-bootstrap';
import './css/Home.css';

function Home() {
  return (
    <div>
      <Header/>
      <div className="background-container">
        <Container className='title-container'>
          <h2>WELCOME TO</h2>
          <h1>AV INDUSTRIAL EQUIPMENT</h1>
          <Stack direction="horizontal" gap={5}>
            <Button variant="outline-light" size="lg" className='m'>Browse by Type</Button>{' '}
            <Button variant="outline-light" size="lg">Browse by Brand</Button>{' '}
          </Stack>
        </Container>
      </div>
    </div>
  );
}

export default Home;
