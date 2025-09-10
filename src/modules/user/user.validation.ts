import z from "zod";
import { UserGender } from "../../db/model/user.model";

export const signupSchema = {
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

export type SignupInputSchema = z.infer<typeof signupSchema.body>;