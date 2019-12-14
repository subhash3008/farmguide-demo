import React from 'react';
import { connect } from 'react-redux';

import styles from './Homepage.module.scss';
import Register from '../register/Register';
import { HomepageProps } from './interfaces';
import { AppState } from '../../../AppState';
import { getCurrentUser } from '../../../actions';

class Homepage extends React.Component<HomepageProps> {
    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <div className={styles.Homepage}>
                <div className={styles.Homepage__LoginContainer}>
                    <Register />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        crop: state.crop && state.crop.cropList
    };
}

const mapDispatchToProps = {
    getCurrentUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);