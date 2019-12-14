import { GET_CROP_LIST } from '../actions/actionTypes';
import { Action } from '../actions/interfaces';

const initialState: { cropList: any[] | null } = {
    cropList: []
};

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_CROP_LIST:
            if (action.payload && action.payload.length) {
                return { ...state, cropList: [...action.payload] };
            }
            return { ...state };
        default:
            return { ...state };
    }
}