import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

import history from '../history';
import Header from './features/header/Header';
import Homepage from './features/homepage/Homepage';
import CropList from './features/crops/CropList';
import { AppState } from '../AppState';
import PageNotFound from './features/pageNotFound/PageNotFound';

class AppRoute extends React.Component<{ isAuthenticated: boolean }> {

    autheticatedRoutes = (isAuthenticated = false) => {
        if (isAuthenticated) {
            return (
                <Route path="/crops" exact component={CropList} />
            );
        }
        return null;
    }

    render() {
        const { isAuthenticated } = this.props;
        return (
            <React.Fragment>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Homepage} />
                            {this.autheticatedRoutes(isAuthenticated)}
                            <Route path="/404" exact component={PageNotFound} />
                            <Redirect to="/404" />
                        </Switch>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        isAuthenticated: (state.auth && state.auth.currentUser) ? true : false
    }
}

export default connect(
    mapStateToProps
)(AppRoute);