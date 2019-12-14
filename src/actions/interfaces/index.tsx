import * as actionTypes from '../actionTypes';
import { Crop } from '../../components/features/crops/interfaces';

// Action Interfaces
export interface GetCropList {
    type: actionTypes.GET_CROP_LIST,
    payload: Crop[] | any[] 
}

export interface SetCurrentUser {
    type: actionTypes.SET_CURRENT_USER,
    payload: undefined | string
}

export interface GetCurrentUser {
    type: actionTypes.GET_CURRENT_USER,
    payload: undefined | string
}

export interface RemoveCurrentUser {
    type: actionTypes.REMOVE_CURRENT_USER
}

export interface RegisterUser {
    type: actionTypes.REGISTER_USER,
    payload: undefined | string
}

// Type of actions
export type Action =
    GetCropList |
    SetCurrentUser |
    GetCurrentUser |
    RemoveCurrentUser |
    RegisterUser;