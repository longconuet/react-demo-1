import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalUserInfo from './ModalUserInfo';
import ModalDeleteUser from './ModalDeleteUser';
import UserTable from './UserTable';
import { getUserList, getPaginatedUserList } from '../../../services/apiService';
import { toast } from 'react-toastify';
import PaginatedUserTable from './PaginatedUserTable';

const ManageUser = () => {
    const PAGE_LIMIT = 5;

    const [userList, setUserList] = useState([]);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [userUpdateData, setUserUpdateData] = useState();
    const [userInfoData, setUserInfoData] = useState();
    const [userDeleteData, setUserDeleteData] = useState();
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    // create
    const handleShowCreateUserModal = () => setShowCreateUserModal(true);
    const handleShowHideCreateUserModal = (value) => setShowCreateUserModal(value);

    //update
    const handleShowUpdateUserModal = (user) => {
        setUserUpdateData(user);
        setShowUpdateUserModal(true);
    };
    const handleSetUserUpdateData = (user) => setUserUpdateData(user);
    const handleShowHideUpdateUserModal = (value) => setShowUpdateUserModal(value);

    // info
    const handleShowUserInfoModal = (user) => {
        setUserInfoData(user);
        setShowUserInfoModal(true);
    };
    const handleSetUserInfoData = (user) => setUserInfoData(user);
    const handleShowHideUserInfoModal = (value) => setShowUserInfoModal(value);

    // delete
    const handleShowDeleteUserModal = (user) => {
        setUserDeleteData(user);
        setShowDeleteUserModal(true);
    };
    const handleSetUserDeleteData = (user) => setUserDeleteData(user);
    const handleShowHideDeleteUserModal = (value) => setShowDeleteUserModal(value);

    const handleSetPage = (pageNumber) => setPage(pageNumber);

    const fetchUserList = async () => {
        let res = await getPaginatedUserList(page, PAGE_LIMIT);

        if (res && res.status === 1) {
            setUserList(res.data.items);
            setPageCount(res.data.totalPages)
        }
        else {
            toast.error(res.message);
        }
    }

    useEffect(() => {
        // call api
        fetchUserList();
    }, [page]);

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
                <div className="table-user-container mt-3">
                    {/* <UserTable
                        userList={userList}
                        handleShowUpdateUserModal={handleShowUpdateUserModal}
                        handleShowUserInfoModal={handleShowUserInfoModal}
                        handleShowDeleteUserModal={handleShowDeleteUserModal}
                    /> */}
                    <PaginatedUserTable
                        userList={userList}
                        handleShowUpdateUserModal={handleShowUpdateUserModal}
                        handleShowUserInfoModal={handleShowUserInfoModal}
                        handleShowDeleteUserModal={handleShowDeleteUserModal}
                        pageCount={pageCount}
                        handleSetPage={handleSetPage}
                    />
                </div>
            </div>

            <ModalCreateUser
                show={showCreateUserModal}
                setShow={handleShowHideCreateUserModal}
                fetchUserList={fetchUserList}
            />

            <ModalUpdateUser
                show={showUpdateUserModal}
                setShow={handleShowHideUpdateUserModal}
                fetchUserList={fetchUserList}
                userUpdateData={userUpdateData}
                handleSetUserUpdateData={handleSetUserUpdateData}
            />

            <ModalUserInfo
                show={showUserInfoModal}
                setShow={handleShowHideUserInfoModal}
                userInfoData={userInfoData}
                handleSetUserInfoData={handleSetUserInfoData}
            />

            <ModalDeleteUser
                show={showDeleteUserModal}
                setShow={handleShowHideDeleteUserModal}
                fetchUserList={fetchUserList}
                userDeleteData={userDeleteData}
                handleSetUserDeleteData={handleSetUserDeleteData}
            />
        </div>
    )
}

export default ManageUser;