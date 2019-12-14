export interface LoginProps {
    emailLogin: boolean,
    handleClose(): void,
    onLogin: any
}

export interface PhoneLoginProps {
    onLogin: any,
    onClose(): void
}