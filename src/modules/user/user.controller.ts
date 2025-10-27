import { Request, Response } from "express";

class UserController {
    /********************************* Get Profile *********************************/
    getProfile = async (req: Request, res: Response) => {
        const user = req.user;
        res.status(200).json({ user });
    };
}

export default new UserController();