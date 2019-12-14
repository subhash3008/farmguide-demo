import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import firebase from '../firebase';
import { _api } from '../api';
import urls from '../api/urls';

export const getCropList = () => async (dispatch: Dispatch) => {
    console.log('IN GET CROP LIST ::', _api, urls);
    const response = await _api.get(urls.getCrops);
    let payload = null;
    if (response && response.data && response.data.length) {
        payload = response.data;
    }
    dispatch({ type: actionTypes.GET_CROP_LIST, payload: payload || [] });
}

export const setCurrentUser = (email: string) => (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: email });
}

export const getCurrentUser = () => async (dispatch: Dispatch) => {
    const user = await firebase.auth().currentUser;
    dispatch({ type: actionTypes.GET_CURRENT_USER, payload: user?.email || user?.phoneNumber });
}

export const removeCurrentUser = () => async (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.REMOVE_CURRENT_USER });
}

export const registerUser = (email: string) => (dispatch: Dispatch) => {
    dispatch({ type: actionTypes.REGISTER_USER, payload: email });
}
