export interface RegisterProps {
    handleSubmit: any,
    formValues: any,
    pristine?: boolean,
    submitting?: boolean,
    registerUser(email: string): void,
    reset(): void
}