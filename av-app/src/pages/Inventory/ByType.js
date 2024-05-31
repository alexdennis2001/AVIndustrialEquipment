import Header from '../../components/Header/Header';
import { Container } from 'react-bootstrap';

function ByType() {
  return (
    <div>
        <Header/>
        <Container fluid className='main-container pt-2'>
            <h1>By Type</h1>
        </Container>
    </div>
  );
}

export default ByType;
