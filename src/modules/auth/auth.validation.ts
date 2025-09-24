import z from "zod";
import { UserGender } from "../../shared/enums";

export const registerSchema = {
    body: z.object({
        username: z.string("Name is required").min(3, "Name must be at least 3 characters long").trim(),
        email: z.string("Email is required").email("Invalid Email").trim(),
        gender: z.enum([UserGender.male, UserGender.female]).optional(),
        age: z.number().min(13, "You must be at least 13 years old").max(120, "Invalid age").optional(),
        password: z.string("Password is required").min(6, "Password must be at least 6 characters long"),
        confirmPassword: z.string("Confirm Password is required")
    }).required().refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
};
export const confirmEmailSchema = {
    body: z.object({
        email: z.string("Email is required").email("Invalid Email").trim(),
        otp: z.string("OTP is required").length(6, "OTP must be 6 characters long").trim()
    }).required()
};
export const loginSchema = {
    body: z.object({
        email: z.string("Email is required").email("Invalid Email").trim(),
        password: z.string("Password is required")
    }).required()
}