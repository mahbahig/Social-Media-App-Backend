import { NextFunction, Request, Response } from "express";
import US from "./user.service";
import { SignupInputSchema } from "./user.validation";

class UserController {
    signup = async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, gender, age, password, confirmPassword }: SignupInputSchema = req.body;

        const user = await US.signup({ username, email, gender, age, password, confirmPassword });

        res.status(200).json({ success: true, message: "User signed up successfully", user });
    }
}

export default new UserController();