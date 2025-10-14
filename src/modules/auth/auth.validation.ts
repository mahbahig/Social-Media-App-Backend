import z from "zod";
import { UserGender } from "../../shared/enums";
import { ConfirmEmailDTO, LoginDTO, RegisterDTO } from "./dtos";

export const registerSchema = {
    body: z.object<RegisterDTO>({
        username: z.string("Name is required").min(3, "Name must be at least 3 characters long").trim() as unknown as string,
        email: z.string("Email is required").email("Invalid Email").trim() as unknown as string,
        gender: z.enum(UserGender).optional() as unknown as UserGender,
        age: z.number().min(13, "You must be at least 13 years old").max(120, "Invalid age").optional() as unknown as number,
        password: z.string("Password is required").min(6, "Password must be at least 6 characters long") as unknown as string,
        confirmPassword: z.string("Confirm Password is required") as unknown as string
    }).required().refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
};
export const confirmEmailSchema = {
    body: z.object<ConfirmEmailDTO>({
        email: z.string("Email is required").email("Invalid Email").trim() as unknown as string,
        otp: z.string("OTP is required").length(6, "OTP must be 6 characters long").trim() as unknown as string
    }).required()
};
export const loginSchema = {
    body: z.object<LoginDTO>({
        email: z.string("Email is required").email("Invalid Email").trim() as unknown as string,
        password: z.string("Password is required") as unknown as string
    }).required()
}