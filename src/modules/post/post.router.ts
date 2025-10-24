import { Router } from "express";
import PostController from "./post.controller";
import { isAuthenticated, validation } from "../../middlewares";
import { createPostSchema } from "./post.validation";
import { commentRouter } from "../comment";

const router = Router();

router.use("/:postId/comment", commentRouter);

router.post("/", validation(createPostSchema), isAuthenticated, PostController.createPost);
router.patch("/reaction/:postId", isAuthenticated, PostController.toggleReaction);
router.get("/:postId", PostController.getPost);
router.put("/:postId", isAuthenticated, PostController.updatePost);
router.delete("/:postId", isAuthenticated, PostController.deletePost);

export default router;