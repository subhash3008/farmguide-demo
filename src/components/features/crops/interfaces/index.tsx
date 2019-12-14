export interface Crop {
    name: string,
    scientificName: string,
    imgUrl: string,
    rate: number
}

export interface CropListProps {
    cropList: Crop[] | null,
    currentUser: string | undefined,
    getCropList(): void,
    getCurrentUser(): void
}