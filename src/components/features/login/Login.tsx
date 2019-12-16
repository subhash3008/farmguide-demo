import React from 'react';

import styles from './Login.module.scss';
import { LoginProps } from './interfaces';

import PhoneLogin from './phoneLogin/PhoneLine';
import firebase from '../../../firebase';
import * as utils from '../../utils';

class LoginModal extends React.Component<LoginProps> {
    inputRef = React.createRef<HTMLInputElement>();
    passwordRef = React.createRef<HTMLInputElement>();

    handleLogin = () => {
        if (
            this.inputRef &&
            this.inputRef.current &&
            this.inputRef.current.value &&
            this.passwordRef &&
            this.passwordRef.current &&
            this.passwordRef.current.value
        ) {
            console.log(this.inputRef.current.value);
            this.props.onLogin(
                this.inputRef.current.value,
                this.passwordRef.current.value
            );
        } else {
            this.props.onLogin('', '');
        }
    }

    onCancel = () => {
        this.props.handleClose();
    }

    renderEmailLogin = () => {
        return (
            <React.Fragment>
                <input
                    className={styles.Modal__Body__Input}
                    type="email"
                    name="email"
                    ref={this.inputRef}
                    placeholder="Please enter email id"
                />
                <input
                    className={styles.Modal__Body__Input}
                    type="password"
                    name="password"
                    ref={this.passwordRef}
                    placeholder="Please enter your password"
                />
            </React.Fragment>
        );
    }

    renderPhoneLogin = () => {
        return (
            <React.Fragment>
                <PhoneLogin
                    onLogin={this.props.onLogin}
                    onClose={this.props.handleClose}
                />
            </React.Fragment>
        );
    }

    handlePasswordReset = async () => {
        const user = this.inputRef.current && this.inputRef.current.value;
        console.log('password reset user :::::', user);
        if (!user) {
            utils.warningToast('Please enter valid email');
        } else {
            try {
                const response = await firebase.auth().sendPasswordResetEmail(user);
                console.log('response password reset ::', response);
                utils.successToast('Password reset email has been sent to your email.');
                this.props.handleClose();
            } catch (e) {
                const eCode = e.code;
                const eMessage = e.message;
                if (eCode === 'auth/user-not-found') {
                    utils.errorToast('User does not exist. Please create an account.');
                } else if (eCode === 'auth/invalid-email') {
                    utils.errorToast('Please provide a valid email');
                } else {
                    utils.errorToast('Something went wrong.' + eMessage);
                }
            }
        }
    }

    renderResetPassword = () => {
        return (
            <button
                className={styles.Modal__Body__ResetBtn}
                onClick={this.handlePasswordReset}
            >
                Forgot Password
            </button>
        );
    }

    render() {
        console.log('MODAL PROPS ::', this.props);
        return (
            <React.Fragment>
                <div className={styles.Wrapper}>
                    <div className={styles.Modal}>
                        <div className={styles.Modal__Header}>
                            <span>Login</span>
                        </div>
                        <div className={styles.Modal__Body}>
                            {this.props.emailLogin ? this.renderEmailLogin() : this.renderPhoneLogin()}
                            {this.props.emailLogin ? this.renderResetPassword() : null}
                        </div>
                        {this.props.emailLogin ?
                            (
                                <div className={styles.Modal__Footer}>
                                    <button className={styles.Modal__Footer__Login} onClick={this.handleLogin}>
                                        Login
                                    </button>
                                    <button className={styles.Modal__Footer__Cancel} onClick={this.onCancel}>
                                        Cancel
                                    </button>
                                </div>
                            ) :
                            null
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginModal;
