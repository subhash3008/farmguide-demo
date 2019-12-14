export interface LoginProps {
    handleClose(): void,
    onLogin(email: string, password: string): void
}