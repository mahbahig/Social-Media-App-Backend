import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentication";
import PostController from "./post.controller";
import { validation } from "../../middlewares";
import { createPostSchema } from "./post.validation";
import { commentRouter } from "../comment";

const router = Router();

router.use("/:postId/comment", commentRouter);

router.post("/", validation(createPostSchema), isAuthenticated, PostController.createPost);
router.patch("/reaction/:postId", isAuthenticated, PostController.toggleReaction);
router.get("/:postId", PostController.getPost);

export default router;