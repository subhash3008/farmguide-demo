import axios from 'axios';

import * as utils from '../components/utils';

export const _api = axios.create({
    baseURL: 'http://farmguide-demo.firebaseio.com/',
});

_api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        utils.errorToast('Something went wrong.');
        return Promise.reject(error);
    }
)