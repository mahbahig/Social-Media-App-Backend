import { Request, Response } from "express";
import AuthService from "./auth.service";
import { ConfirmEmailDTO, LoginDTO, RegisterDTO } from "./dtos";

class AuthController {
    /********************************* Register *********************************/
    register = async (req: Request, res: Response) => {
        const registerDTO: RegisterDTO = req.body;

        const accessToken = await AuthService.register(registerDTO);

        res.status(200).json({ message: "User registered successfully", accessToken });
    };

    /********************************* Confirm Email *********************************/
    confirmEmail = async (req: Request, res: Response) => {
        const confirmEmailDTO: ConfirmEmailDTO = req.body;

        await AuthService.confirmEmail(confirmEmailDTO);

        res.status(200).json({ message: "Email confirmed successfully" });
    };

    /********************************* Login *********************************/
    login = async (req: Request, res: Response) => {
        const loginDTO: LoginDTO = req.body;

        const accessToken = await AuthService.login(loginDTO);

        res.status(200).json({ message: "User logged in successfully", accessToken });
    };
}

export default new AuthController();
