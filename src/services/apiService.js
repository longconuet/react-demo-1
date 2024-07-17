import axios from '../utils/axiosCustomize';

const getUserList = async () => {
    return await axios.get('api/users/all');
}

const postCreateUser = async (fullName, email, phone, username, password, role, avatar) => {
    const data = new FormData();
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('phone', phone);
    data.append('username', username);
    data.append('password', password);
    data.append('role', +role);
    data.append('avatar', avatar);

    return await axios.post('api/users/store', data);
}

const putUpdateUser = async (id, fullName, email, phone, username, role, avatar) => {
    const data = new FormData();
    data.append('id', id);
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('phone', phone);
    data.append('username', username);
    data.append('role', +role);
    data.append('avatar', avatar);

    return await axios.post('api/users/update', data);
}

export { getUserList, postCreateUser, putUpdateUser }