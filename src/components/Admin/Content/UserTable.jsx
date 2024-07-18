import Table from 'react-bootstrap/Table';
import { getApiImagePath } from '../../../utils/imageHelper';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

const UserTable = ({
    userList,
    handleShowUpdateUserModal,
    handleShowUserInfoModal,
    handleShowDeleteUserModal
}) => {
    const getRoleBadge = (role) => {
        let roleBadge = '';
        switch (role) {
            case 0:
                roleBadge = <Badge bg="primary">ADMIN</Badge>;
                break;
            case 1:
                roleBadge = <Badge bg="secondary">USER</Badge>;
                break;

            default:
                break;
        }
        return roleBadge;
    }

    return (
        <>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Avatar</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.length > 0 && userList.map((user, index) => {
                            return (
                                <tr key={`user-table-${user.id}`}>
                                    <td>{index + 1}</td>
                                    <td className="text-center">
                                        {<Image src={getApiImagePath(user.avatar)} className='avatar' roundedCircle />}
                                    </td>
                                    <td>{user.fullName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{getRoleBadge(user.role)}</td>
                                    <td>
                                        <Stack direction="horizontal" gap={2}>
                                            <Button variant="info" onClick={() => handleShowUserInfoModal(user)}>View</Button>
                                            <Button variant="warning" onClick={() => handleShowUpdateUserModal(user)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleShowDeleteUserModal(user)}>Delete</Button>
                                        </Stack>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        userList.length === 0 &&
                        <tr>
                            <td colSpan={8} className="text-center">No data</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}

export default UserTable