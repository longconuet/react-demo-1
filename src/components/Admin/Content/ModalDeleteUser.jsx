import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteUser = ({
    show,
    setShow,
    userDeleteData,
    handleSetUserDeleteData,
    fetchUserList
}) => {
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!_.isEmpty(userDeleteData)) {
            setUserId(userDeleteData.id);
            setFullName(userDeleteData.fullName);
            setUsername(userDeleteData.username);
        }
    }, [userDeleteData])

    const handleClose = () => {
        setShow(false);
        resetUserDeleteModal();
        handleSetUserDeleteData({});
    }

    const resetUserDeleteModal = () => {
        setUserId('');
        setFullName('');
        setUsername('');
    }

    const handleSubmitDeleteUser = async () => {
        // call api
        let res = await deleteUser(userId);

        if (res && res.status === 1) {
            toast.success(res.message);
            fetchUserList();
            handleClose();
        }
        else {
            toast.error(res.message);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure to delete user <span className='text-danger'><strong>{fullName}</strong> ({username})</span> ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleSubmitDeleteUser}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteUser