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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

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

    if (error.response) {
        if (error.response.status === 401) {
            // Handle 401 Unauthorized error
            // Dispatch logout action
            store.dispatch(logout());
            toast.error('Unauthorized access. Please login!');
        }
        else if (error.response.status === 403) {
            window.location.href = '/access-forbiden';
        }

        return Promise.reject(error);
    }

    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //     if (isRefreshing) {
    //         return new Promise((resolve, reject) => {
    //             failedQueue.push({ resolve, reject });
    //         })
    //             .then(token => {
    //                 originalRequest.headers['Authorization'] = 'Bearer ' + token;
    //                 return instance(originalRequest);
    //             })
    //             .catch(err => {
    //                 return Promise.reject(err);
    //             });
    //     }

    //     originalRequest._retry = true;
    //     isRefreshing = true;

    //     return new Promise((resolve, reject) => {
    //         const accessToken = store?.getState()?.auth?.account?.accessToken;
    //         const refreshToken = store?.getState()?.auth?.account?.refreshToken;
    //         instance.post('/auth/refresh-token', {
    //             accessToken,
    //             refreshToken
    //         })
    //             .then(({ res }) => {
    //                 if (res.status === 0) {
    //                     store.dispatch(logout());
    //                     toast.error('Unauthorized access. Please login!');
    //                 }
    //                 else {
    //                     store.dispatch(setToken(res.data));
    //                     const newToken = res.data.accessToken;
    //                     instance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
    //                     originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
    //                     processQueue(null, newToken);
    //                     resolve(instance(originalRequest));
    //                 }
    //             })
    //             .catch((err) => {
    //                 processQueue(err, null);
    //                 reject(err);
    //             })
    //             .finally(() => {
    //                 isRefreshing = false;
    //             });
    //     });
    // }

    return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
});

export default instance;