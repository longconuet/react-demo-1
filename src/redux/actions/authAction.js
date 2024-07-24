export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

export const setToken = (data) => ({
    type: SET_TOKEN,
    payload: data,
});

export const logout = () => ({
    type: LOGOUT,
});