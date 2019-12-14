import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import cropListReducer from './cropListReducer';

export default combineReducers({
    crop: cropListReducer,
    form: formReducer,
    auth: authReducer
});