import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/actions/authAction';
import { toast } from 'react-toastify';
import { postLogout } from '../../services/apiService';

const Header = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const authAccount = useSelector(state => state.auth.account);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        // submit
        let res = await postLogout(authAccount?.accessToken, authAccount?.refreshToken);
        if (res && res.status === 1) {
            toast.success(res.message);
            dispatch(logout(res.data));
            navigate('/login');
        }
        else {
            toast.error(res ? res.message : "Something went wrong!");
        }
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
                                <NavDropdown.Item
                                    href="#!"
                                    onClick={(e) => { handleLogout(e) }}
                                >
                                    Logout
                                </NavDropdown.Item>
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