import axios from '../utils/axiosCustomize';

const getUserList = async () => {
    return await axios.get('api/users/all');
}

const getPaginatedUserList = async (page, limit) => {
    return await axios.get(`api/users/paginated-list?page=${page}&limit=${limit}`);
}

const getUserInfo = async (id) => {
    return await axios.get(`api/users/detail/${id}`);
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

const putUpdateUser = async (id, fullName, email, phone, username, role, avatar, avatarPreview) => {
    const data = new FormData();
    data.append('id', id);
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('phone', phone);
    data.append('username', username);
    data.append('role', +role);
    data.append('avatar', avatar);
    data.append('avatarPath', avatarPreview);

    return await axios.put('api/users/update', data);
}

const deleteUser = async (id) => {
    return await axios.delete(`api/users/delete/${id}`);
}

const postLogin = async (username, password) => {
    return await axios.post('api/auth/login', { username, password });
}

const postLogout = async (accessToken, refreshToken) => {
    return await axios.post('api/auth/logout', { accessToken, refreshToken });
}

export {
    getUserList,
    getPaginatedUserList,
    getUserInfo,
    postCreateUser,
    putUpdateUser,
    deleteUser,
    postLogin,
    postLogout
}