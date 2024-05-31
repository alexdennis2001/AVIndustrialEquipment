import Header from '../../components/Header/Header';
import { Container } from 'react-bootstrap';

function ViewAll() {
  return (
    <div>
        <Header/>
        <Container fluid className='main-container pt-2'>
            <h1>View All</h1>
        </Container>
    </div>
  );
}

export default ViewAll;
