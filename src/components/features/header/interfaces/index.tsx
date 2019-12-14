export interface HeaderProps {
    currentUser: string | undefined,
    getCurrentUser(): void,
    setCurrentUser(email: string): void,
    removeCurrentUser(): void
}