import axios from 'axios';

import * as utils from '../components/utils';

export const _api = axios.create({
    baseURL: process.env.REACT_APP_URL
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