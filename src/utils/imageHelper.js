import UserAvatar from '../assets/images/user-avatar.png';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getApiImagePath = (path, useDefaultAvatar = true) => {
    let fullUrl = `${API_BASE_URL}${path}`;
    return path ? fullUrl : (useDefaultAvatar ? UserAvatar : '');
}

export { getApiImagePath }