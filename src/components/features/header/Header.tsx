import React from 'react';
import { connect } from 'react-redux';

import styles from './Header.module.scss';
import { getCurrentUser, setCurrentUser, removeCurrentUser } from '../../../actions';
import { AppState } from '../../../AppState';
import { HeaderProps } from './interfaces';
import Modal from '../login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../../firebase';
import * as utils from '../../utils';
import history from '../../../history';

class Header extends React.Component<HeaderProps, { showModal: boolean }> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = { showModal: false };
    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    componentDidUpdate() {
        if (this.props.currentUser) {
            history.push('/crops');
        }
    }

    onLogin = async (email: string, password: string) => {
        if (email && password) {
            try {
                const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
                if (resp && resp.user && resp.user.email) {
                    this.setState({ showModal: false });
                    this.props.setCurrentUser(email);
                    utils.successToast('Signed In Successfully');
                    history.push('/crops');
                }
            } catch (e) {
                const eCode = e.code;
                if (eCode === 'auth/wrong-password') {
                    utils.errorToast('Wrong Password');
                } else if (eCode === 'auth/invalid-email') {
                    utils.errorToast('Email does not exist');
                } else {
                    utils.errorToast('Could not sign in. Please try again.');
                }
                console.error(e);
            }
        } else {
            utils.warningToast('Invalid email or password');
        }
    }

    handleBtnClick = async () => {
        const user = await firebase.auth().currentUser;
        if (user && user.email) {
            try {
                await firebase.auth().signOut();
                this.props.removeCurrentUser();
                utils.successToast('Signed out successfully');
                history.push('/');
            } catch (e) {
                utils.errorToast('Could not sign out. Please try again');
                console.error(e);
            }
        } else {
            this.setState({ showModal: true });
        }
    }

    render() {
        return (
            <div className={styles.Header}>
                <div className={styles.Header__Heading}>
                    <div className={styles.Header__Heading__Logo}>
                        <img src="/images/brand.png" alt="brand" />
                        <span className={styles.Header__Heading__Logo__Text}>
                            FARMGUIDE
                        </span>
                    </div>
                </div>
                <div className={styles.Header__Content}>
                </div>
                <div className={styles.Header__Auth}>
                    <button
                        className={styles.Header__Auth__Btn}
                        style={{ background: this.props.currentUser ? 'crimson' : 'dodgerblue' }}
                        onClick={this.handleBtnClick}
                    >
                        {this.props.currentUser ? 'Logout' : 'Login'}
                    </button>
                </div>
                {this.state.showModal ?
                    <Modal
                        onLogin={this.onLogin}
                        handleClose={() => this.setState({showModal: false})}
                    /> :
                    null
                }
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        currentUser: state.auth && state.auth.currentUser
    };
}

const mapDispatchToProps = {
    getCurrentUser,
    setCurrentUser,
    removeCurrentUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);