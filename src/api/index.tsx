import axios from 'axios';

import * as utils from '../components/utils';

export const _api = axios.create({
    baseURL: process.env.REACT_APP_URL
});
console.log(_api);

_api.interceptors.request.use(
    config => {
        config.headers = { ...config.headers };
        console.log('config :::::', config);
        return config;
    },
    error => {
    return Promise.reject(error);
});

_api.interceptors.response.use(
    response => {
        console.log('RES : ', response);
        return response;
    },
    error => {
        utils.errorToast('Something went wrong.');
        return Promise.reject(error);
    }
)