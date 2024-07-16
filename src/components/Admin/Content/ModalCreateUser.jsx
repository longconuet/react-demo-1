import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';

const ModalCreateUser = ({ show, handleClose }) => {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState('USER');
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        }
    }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setAvatar(file);
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
                            <Form.Control type='text' value={fullName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type='text' value={email} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="username">
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type='text' value={username} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" value={password} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="role">
                        <Form.Label column sm="2">
                            Role
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select value={role} >
                                <option value="1">ADMIN</option>
                                <option value="2">USER</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="avatar">
                        <Form.Label column sm="2">
                            Avatar
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="file" onChange={handlePreviewAvatar} value={avatar} />
                            <div>
                                {avatar && <Image src={avatar.preview} rounded className='preview-avatar mt-2' />}
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateUser