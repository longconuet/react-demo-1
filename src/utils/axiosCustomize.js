import axios from 'axios';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import { store } from '../redux/store';
import { logout } from '../redux/actions/authAction';

NProgress.configure({
    showSpinner: false,
    trickle: 100
});


const instance = axios.create({
    baseURL: 'https://localhost:7104/',
    timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();

    // add access token
    const accessToken = store?.getState()?.auth?.account?.accessToken;
    config.headers['Authorization'] = `Bearer ${accessToken}`;

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
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();

    if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        // Dispatch logout action
        store.dispatch(logout());
        toast.error('Unauthorized access. Please login!');
        return Promise.reject(error);
    }

    return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
});

export default instance;