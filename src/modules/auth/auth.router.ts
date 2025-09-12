import { Router } from "express";
import AuthController from "./auth.controller";
import { validation } from "../../middlewares";
import { registerSchema } from "./auth.validation";

const router = Router({ caseSensitive: true, strict: true });

router.post("/register", validation(registerSchema), AuthController.register);
router.post("/confirmEmail", AuthController.confirmEmail);

export default router;