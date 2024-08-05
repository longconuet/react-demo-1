import axios from 'axios';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import { store } from '../redux/store';
import { logout, setToken } from '../redux/actions/authAction';

NProgress.configure({
    showSpinner: false,
    trickle: 100
});


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: process.env.REACT_APP_API_TIME_OUT
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();

    // add access token
    const accessToken = store?.getState()?.auth?.account?.accessToken;
    config.headers['Authorization'] = `Bearer ${accessToken}`;

    // cancel token
    // const source = axios.CancelToken.source();
    // config.cancelToken = source.token;
    // config.cancelTokenSource = source; // Thêm thuộc tính này để truy cập dễ dàng hơn

    return config;
}, function (error) {
    NProgress.done();

    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();

    return response.data ? response.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();

    if (error.response) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const accessToken = store?.getState()?.auth?.account?.accessToken;
            const refreshToken = store?.getState()?.auth?.account?.refreshToken;

            if (refreshToken) {
                try {
                    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/auth/refresh-token`, {
                        accessToken,
                        refreshToken
                    })

                    if (res.data.status === 0) {
                        store.dispatch(logout());
                        toast.error('Unauthorized access. Please login!');
                    }
                    else {
                        // don't use axious instance that already configured for refresh token api call
                        store.dispatch(setToken(res.data.data));  //set new access token
                        originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;

                        return axios(originalRequest); //recall Api with new token
                    }
                } catch (error) {
                    store.dispatch(logout());
                    toast.error('Unauthorized access. Please login!');
                }
            }
        }

        if (error.response.status === 403) {
            window.location.href = '/access-forbiden';
        }

        return Promise.reject(error);
    }

    return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
});

export default instance;