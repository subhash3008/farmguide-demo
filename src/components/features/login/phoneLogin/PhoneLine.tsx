import React from 'react';

import styles from './PhoneLine.module.scss';
import firebase from '../../../../firebase';
import { PhoneLoginProps } from '../interfaces';

declare global {
    interface Window {
        recaptchaVerifier: any,
        confirmationResult: any
    }
}

class PhoneLogin extends React.Component<PhoneLoginProps> {
    phoneRef = React.createRef<HTMLInputElement>();
    codeRef = React.createRef<HTMLInputElement>();

    componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                'size': 'invisible',
                'callback': (response: any) => {
                    console.log('RESPONSE ::', response);
                    this.submitPhoneNumberAuth();
                }
            }
        );
    }

    submitPhoneNumberAuth = () => {
        if (this.phoneRef.current && this.phoneRef.current.value) {
            const phoneNumber = '+91' + this.phoneRef.current.value;
            const appVerifier = window.recaptchaVerifier;
            console.log('PHONE ::::', phoneNumber, appVerifier);
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(
                    (confirmationResult) => {
                        console.log('CONFIRMATION RESULT:::', confirmationResult);
                        window.confirmationResult = confirmationResult;
                    }
                )
                .catch(
                    error => {
                        console.error(error);
                    }
                );
        }
        
    }

    submitPhoneNumberAuthCode = () => {
        if (this.codeRef.current && this.codeRef.current.value) {
            const code = this.codeRef.current.value;
            window.confirmationResult
                .confirm(code)
                .then(
                    (result: any) => {
                        const user = result.user;
                        console.log('PHONE VERIFIED ::', user);
                        this.props.onLogin(user.phoneNumber);
                    }
                )
                .catch(
                    (error: any) => {
                        console.error(error);
                    }
                );
        }
    }

    render() {
        return (
            <div className={styles.PhoneLogin}>
                <div className={styles.PhoneLogin__Form}>
                    <div className={styles.PhoneLogin__Form__Field}>
                        <input
                            name="tel"
                            ref={this.phoneRef}
                            type="tel"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className={styles.PhoneLogin__Form__Field}>
                        <input
                            name="code"
                            ref={this.codeRef}
                            type="text"
                            placeholder="Verification Code"
                        />
                    </div>
                    <div id="recaptcha-container"></div>
                    <div className={styles.PhoneLogin__Form__Btn__Verify}>
                        <button onClick={this.submitPhoneNumberAuth}>
                            Get Verification Code
                        </button>
                    </div>
                    <div className={styles.PhoneLogin__Form__Footer}>
                        <button
                            className={styles.PhoneLogin__Form__Footer__Login}
                            onClick={this.submitPhoneNumberAuthCode}
                        >
                            Login
                        </button>
                        <button
                            className={styles.PhoneLogin__Form__Footer__Cancel}
                            onClick={this.props.onClose}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default PhoneLogin;
