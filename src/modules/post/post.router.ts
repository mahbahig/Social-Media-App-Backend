import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentication";
import PostController from "./post.controller";

const router = Router();

router.post("/", isAuthenticated, PostController.createPost);

export default router;