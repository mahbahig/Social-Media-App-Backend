import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { ConfirmEmailSchema, RegisterInputSchema } from "./auth.validation";
import { RegisterDTO } from "./auth.dto";

class AuthController {
    // ============================== Register ==============================
    register = async (req: Request, res: Response, next: NextFunction) => {
        const registerDTO: RegisterDTO = req.body;

        const user = await AuthService.register(registerDTO);

        res.status(200).json({ success: true, message: "User registered successfully", user });
    }

    confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
        const { otp, email }: ConfirmEmailSchema = req.body;
        
    }
}

export default new AuthController();