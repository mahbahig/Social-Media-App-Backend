import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { ConfirmEmailDTO, RegisterDTO } from "./auth.dto";

class AuthController {
    /********************************* Register *********************************/
    register = async (req: Request, res: Response, next: NextFunction) => {
        const registerDTO: RegisterDTO = req.body;

        const { accessToken, refreshToken } = await AuthService.register(registerDTO);

        res.status(200).json({ success: true, message: "User registered successfully", accessToken, refreshToken });
    };

    /********************************* Confirm Email *********************************/
    confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
        const confirmEmailDTO: ConfirmEmailDTO = req.body;

        await AuthService.confirmEmail(confirmEmailDTO);

        res.status(200).json({ success: true, message: "Email confirmed successfully" });
    };

    /********************************* Login *********************************/
    login = async (req: Request, res: Response, next: NextFunction) => {
        const loginDTO = req.body;

        const { accessToken, refreshToken } = await AuthService.login(loginDTO);

        res.status(200).json({ success: true, message: "User logged in successfully", accessToken, refreshToken });
    };
}

export default new AuthController();
