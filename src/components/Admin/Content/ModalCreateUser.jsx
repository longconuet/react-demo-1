import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postCreateUser } from '../../../services/apiService';
import _ from 'lodash';

const ModalCreateUser = ({
    show,
    setShow,
    fetchUserList
}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(1);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatarPreview);
        }
    }, [avatar, avatarPreview])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file)
        setAvatar(file);
        setAvatarPreview(preview);
    }

    const handleClose = () => {
        setShow(false);
        resetCreateUserModal();
    }

    const validateEmail = (input) => {
        return input.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmitCreateUser = async () => {
        // validate 
        if (_.isEmpty(fullName)) {
            toast.error("Please enter Full name!");
            return;
        }
        if (_.isEmpty(email)) {
            toast.error("Please enter Email!");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Invalid email!");
            return;
        }
        if (_.isEmpty(phone)) {
            toast.error("Please enter Phone!");
            return;
        }
        if (_.isEmpty(username)) {
            toast.error("Please enter Username!");
            return;
        }
        if (_.isEmpty(password)) {
            toast.error("Please enter Password!");
            return;
        }

        // call api
        let res = await postCreateUser(fullName, email, phone, username, password, role, avatar);

        if (res && res.status === 1) {
            toast.success(res.message);
            fetchUserList();
            handleClose();
        }
        else {
            toast.error(res.message);
        }
    }

    const resetCreateUserModal = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setUsername('');
        setPassword('');
        setRole(1);
        setAvatar();
        setAvatarPreview();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="fullName">
                        <Form.Label column sm="2">
                            Full Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type='text'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                        <Form.Label column sm="2">
                            Phone
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type='text'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="username">
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="role">
                        <Form.Label column sm="2">
                            Role
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="1">USER</option>
                                <option value="0">ADMIN</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="avatar">
                        <Form.Label column sm="2">
                            Avatar
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="file" onChange={handlePreviewAvatar} />
                            <div>
                                {avatar && avatarPreview && <Image src={avatarPreview} rounded className='preview-avatar mt-2' />}
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitCreateUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default memo(ModalCreateUser)