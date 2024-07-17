import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default App;
