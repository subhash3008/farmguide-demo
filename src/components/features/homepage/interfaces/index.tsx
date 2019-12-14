import { Crop } from "../../crops/interfaces";

export interface HomepageProps {
    cropList: Crop[] | null,
    getCurrentUser(): void
}