import { Router } from "express";
import { isAuthenticated } from "../../middlewares";
import UserController from "./user.controller";

const userRouter = Router({ caseSensitive: true, strict: true });

userRouter.get("/profile", isAuthenticated, UserController.getProfile);

export default userRouter;