import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentication";
import PostController from "./post.controller";
import { validation } from "../../middlewares";
import { createPostSchema } from "./post.validation";

const router = Router();

router.post("/", validation(createPostSchema), isAuthenticated, PostController.createPost);
router.patch("/reaction/:postId", isAuthenticated, PostController.toggleReaction);

export default router;