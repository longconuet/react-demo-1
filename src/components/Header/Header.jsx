import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to='/'>Home</NavLink>
                        <NavLink className='nav-link' to='/user'>Users</NavLink>
                        <NavLink className='nav-link' to='/admin'>Admin</NavLink>
                    </Nav>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        {
                            isAuthenticated === true &&
                            <>
                                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                            </>
                        }
                        {
                            isAuthenticated === false &&
                            <NavDropdown.Item
                                href="#!"
                                onClick={(e) => { handleLogin(e) }}
                            >
                                Login
                            </NavDropdown.Item>
                        }
                    </NavDropdown>
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;