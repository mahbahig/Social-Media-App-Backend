import { Router } from "express";
import UC from "./user.controller";
import { validation } from "../../middlewares";
import { signupSchema } from "./user.validation";

const userRouter = Router({ caseSensitive: true, strict: true });

userRouter.post("/signup", validation(signupSchema), UC.signup);

export default userRouter;