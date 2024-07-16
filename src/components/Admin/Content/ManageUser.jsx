import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa6";

import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';

const ManageUser = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    const handleCloseCreateUserModal = () => setShowCreateUserModal(false);
    const handleShowCreateUserModal = () => setShowCreateUserModal(true);

    return (
        <div className="manage-user-container">
            <div className="title mb-4">
                <h4>Manage User</h4>
            </div>
            <hr />
            <div className="manage-user-content">
                <div className='d-flex justify-content-end'>
                    <Button variant="success" onClick={() => handleShowCreateUserModal()}>
                        <FaPlus />
                        Add new user
                    </Button>
                </div>
                <div>
                    Table user
                </div>
            </div>

            <ModalCreateUser
                show={showCreateUserModal}
                handleClose={handleCloseCreateUserModal} />
        </div>
    )
}

export default ManageUser;