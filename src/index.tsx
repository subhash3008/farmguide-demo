import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'
import * as actionTypes from './actions/actionTypes';
import firebase from './firebase';

// Redux Devtools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('APP USER :::', user);
        if (user.email || user.phoneNumber) {
            store.dispatch(
                {
                    type: actionTypes.SET_CURRENT_USER,
                    payload: user.email || user.phoneNumber
                }
            );
        }
    } else {
        console.log('APP USER:::: no users');
    }
});

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.querySelector('#root')
);