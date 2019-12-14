export interface AppState {
    form: any,
    crop: {
        cropList: any[] | null
    },
    auth: {
        currentUser?: string
    }
}