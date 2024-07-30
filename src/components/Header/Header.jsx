import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
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
                        {
                            isAuthenticated === true && authAccount && authAccount.role === 0 &&
                            <NavLink className='nav-link' to='/admin'>Manager</NavLink>
                        }
                    </Nav>
                    <Nav>
                        {
                            isAuthenticated === false &&
                            <Button variant="outline-info" onClick={(e) => { handleLogin(e) }}>Login</Button>
                        }
                        {
                            isAuthenticated === true &&
                            <>
                                <span className='mt-2 me-4'>Hello <strong>{authAccount && authAccount.fullName}</strong></span>
                                <Button variant="outline-secondary" onClick={(e) => { handleLogout(e) }}>Logout</Button>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;