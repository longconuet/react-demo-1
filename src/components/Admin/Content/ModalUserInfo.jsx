import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getApiImagePath } from '../../../utils/imageHelper';

const ModalUserInfo = ({
    show,
    setShow,
    userInfoData,
    handleSetUserInfoData
}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState(1);
    const [avatarPreview, setAvatarPreview] = useState();

    useEffect(() => {
        if (!_.isEmpty(userInfoData)) {
            setFullName(userInfoData.fullName);
            setEmail(userInfoData.email);
            setPhone(userInfoData.phone);
            setUsername(userInfoData.username);
            setRole(userInfoData.role);
            setAvatarPreview(getApiImagePath(userInfoData.avatar, true))
        }
    }, [userInfoData])

    const handleClose = () => {
        setShow(false);
        resetUserInfoModal();
        handleSetUserInfoData({});
    }

    const resetUserInfoModal = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setUsername('');
        setRole(1);
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
                <Modal.Title>User Info</Modal.Title>
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="role">
                        <Form.Label column sm="2">
                            Role
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type='text'
                                value={role === 1 ? "USER" : "ADMIN"}
                                disabled
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="avatar">
                        <Form.Label column sm="2">
                            Avatar
                        </Form.Label>
                        <Col sm="10">
                            <div>
                                {avatarPreview && <Image src={avatarPreview} rounded className='preview-avatar mt-2' />}
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUserInfo