import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {connect} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Register.module.scss';
import { AppState } from '../../../AppState';
import { registerUser } from '../../../actions';
import { RegisterProps } from './interfaces';
import * as utils from '../../utils';
import firebase from '../../../firebase';


class Register extends React.Component<RegisterProps> {

    handleSubmit = async ({email = '', password = ''}) => {
        if (email && password) {
            try {
                const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
                if (res.user && res.user.email) {
                    this.props.registerUser(res.user.email);
                    utils.successToast('Registered Successfully.');
                    this.props.reset();
                }
            } catch (e) {
                const eCode = e.code;
                if (eCode === 'auth/email-already-in-use') {
                    utils.errorToast('Email aready in use');
                } else {
                    utils.errorToast('Something went wrong');
                }
                console.error(e);
            }
        }
    }

    renderInput = ({ input = {}, label = '', type = '', meta: { touched = false, error = ''} }) => {
        return (
            <div>
                <input {...input} placeholder={label} autoComplete="off" type={type} className={styles.Login__Form__Field__Control__Input}></input>
                {touched && ((error && <div className={styles.Login__Form__Field__Control__InputError}>{error}</div>))}
            </div>
        );
    };

    renderForm = () => {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div className={styles.Login}>
                <h3 className={styles.Login__Title}>Register now</h3>
                <form className={styles.Login__Form} onSubmit={handleSubmit(this.handleSubmit)}>
                    <div className={styles.Login__Form__Field}>
                        <div className={styles.Login__Form__Field__Control}>
                            <Field
                                className={styles.Login__Form__Field__Control__Input}
                                name="email"
                                component={this.renderInput}
                                type="email"
                                label="Email Address"
                            />
                        </div>
                    </div>
                    <div className={styles.Login__Form__Field}>
                        <div className={styles.Login__Form__Field__Control}>
                            <Field
                                className={styles.Login__Form__Field__Control__Input}
                                name="password"
                                component={this.renderInput}
                                type="password"
                                label="Password"
                            />
                        </div>
                    </div>
                    <div className={styles.Login__Form__Field}>
                        <div className={styles.Login__Form__Field__Control}>
                            <Field
                                className={styles.Login__Form__Field__Control__Input}
                                name="confirmPassword"
                                component={this.renderInput}
                                type="text"
                                label="Confirm Password"
                            />
                        </div>
                    </div>
                    <div className={styles.Login__Form__Field}>
                        <div className={styles.Login__Form__Field__Control}>
                            <button
                                className={styles.Login__Form__Field__Control__Submit}
                                type="submit"
                                disabled={pristine || submitting}
                            >
                                <span>Register</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    render = () => {
        return (
            <React.Fragment>
                {this.renderForm()}
            </React.Fragment>
        );
    }
}


const validate = (formValues: any) => {
    const errors: any = {};
    if (!formValues.email) {
        errors.email = 'You must enter an email.';
    }
    if (formValues.email) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!pattern.test(formValues.email)) {
            errors.email = 'Not valid email.';
        }
    }
    if (!formValues.password) {
        errors.password = 'You must enter a password.';
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = 'Password must be 6 characters long.'
    }
    if (!formValues.confirmPassword) {
        errors.confirmPassword = 'You must confirm the password.';
    }
    if (formValues.password && formValues.confirmPassword && formValues.password !== formValues.confirmPassword) {
        errors.password = 'Passwords must match.';
        errors.confirmPassword = 'Passwords must match.';
    }
    return errors;
};

const mapStateToProps = (state: AppState) => {
    return {
        formValues: state.form && state.form.registerForm && state.form.registerForm.values
    };
}

const mapDispatchToProps = {
    registerUser
};

const RegisterConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterConnected);