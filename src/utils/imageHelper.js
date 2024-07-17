import UserAvatar from '../assets/images/user-avatar.png';

const API_BASE_URL = 'https://localhost:7104/';

const getApiImagePath = (path) => {
    return path ? `${API_BASE_URL}${path}` : UserAvatar;
}

export { getApiImagePath }