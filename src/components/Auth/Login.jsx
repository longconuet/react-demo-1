import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/authAction';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // validate
        if (_.isEmpty(username)) {
            toast.error('Please enter Username');
            return;
        }
        if (_.isEmpty(password)) {
            toast.error('Please enter Password');
            return;
        }

        // submit
        let res = await postLogin(username, password);
        if (res && res.status === 1) {
            toast.success(res.message);
            dispatch(setToken(res.data));
            navigate('/');
        }
        else {
            toast.error(res ? res.message : "Something went wrong!");
        }
    }

    return (
        <>
            <Container fluid="md">
                <Row >
                    <Col md={12} className='mt-5 mb-4 text-center'>
                        <h3>Login</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FloatingLabel>
                            <div className="d-grid mt-4">
                                <Button variant="primary" size="lg" onClick={handleLogin}>
                                    Login
                                </Button>
                            </div>
                            <div className='text-center mt-3'>
                                <a href="#!" onClick={(e) => { e.preventDefault(); navigate('/') }}>Go to Home page</a>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;