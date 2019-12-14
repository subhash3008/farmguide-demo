import { Action } from '../actions/interfaces';
import {
    REGISTER_USER,
    SET_CURRENT_USER,
    GET_CURRENT_USER,
    REMOVE_CURRENT_USER
} from '../actions/actionTypes';

const initialState : {currentUser: string | undefined} = {
    currentUser: undefined
};

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, currentUser: action.payload || '' };
        case SET_CURRENT_USER:
            if (action.payload) {
                return { ...state, currentUser: action.payload };
            }
            return { ...state };
        case GET_CURRENT_USER:
            if (action.payload) {
                return { ...state, currentUser: action.payload };
            }
            return { ...state };
        case REMOVE_CURRENT_USER:
            return { ...state, currentUser: undefined };
        default:
            return { ...state };
    }
};