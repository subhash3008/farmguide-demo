import React from 'react';

import styles from './Login.module.scss';
import { LoginProps } from './interfaces';

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

    render() {
        return (
            <React.Fragment>
                <div className={styles.Wrapper}>
                    <div className={styles.Modal}>
                        <div className={styles.Modal__Header}>
                            <span>Login</span>
                        </div>
                        <div className={styles.Modal__Body}>
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
                        </div>
                        <div className={styles.Modal__Footer}>
                            <button className={styles.Modal__Footer__Login} onClick={this.handleLogin}>
                                Login
                            </button>
                            <button className={styles.Modal__Footer__Cancel} onClick={this.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginModal;