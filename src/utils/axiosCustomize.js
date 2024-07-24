import axios from 'axios';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';

NProgress.configure({
    showSpinner: false,
    trickle: 100
});


const instance = axios.create({
    baseURL: 'https://localhost:7104/',
    timeout: 5000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();

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

    console.log(error);
    if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        toast.error('Unauthorized access. Please login!');
        // Redirect to login page or show login modal
        // navigate('/login');
    }

    return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
});

export default instance;