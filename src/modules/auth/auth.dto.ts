import { UserGender } from "../../shared/enums";

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    age?: number;
    gender?: UserGender;
}