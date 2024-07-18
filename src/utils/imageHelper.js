import UserAvatar from '../assets/images/user-avatar.png';

const API_BASE_URL = 'https://localhost:7104/';

const getApiImagePath = (path, useDefaultAvatar = true) => {
    let fullUrl = `${API_BASE_URL}${path}`;
    return path ? fullUrl : (useDefaultAvatar ? UserAvatar : '');
}

export { getApiImagePath }