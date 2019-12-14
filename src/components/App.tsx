import React from 'react';
import { connect } from 'react-redux';

import AppRoute from './AppRoute';
import styles from './App.module.scss';
import { getCropList } from '../actions';

class App extends React.Component<{ getCropList(): void }> {

    componentDidMount() {
        console.log('SENDING CROPS LIST REQUEST');
        this.props.getCropList();
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.App}>
                    <AppRoute />
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    getCropList
}

export default connect(null, mapDispatchToProps)(App);