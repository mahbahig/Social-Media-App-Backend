import { Router } from "express";
import AuthController from "./auth.controller";
import { validation } from "../../middlewares";
import { confirmEmailSchema, loginSchema, registerSchema } from "./auth.validation";

const router = Router({ caseSensitive: true, strict: true });

router.post("/register", validation(registerSchema), AuthController.register);
router.patch("/confirmEmail", validation(confirmEmailSchema), AuthController.confirmEmail);
router.post("/login", validation(loginSchema), AuthController.login)

export default router;