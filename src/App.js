import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <div className="app-container">
            <div className='header-container'>
                <Header />
            </div>
            <div className='main-container my-4'>
                <Container>
                    <Outlet />
                </Container>
            </div>
        </div>
    );
}

export default App;
