import { Router } from "express";
import CommentController from "./comment.controller";
import { isAuthenticated } from "../../middlewares";

const router = Router({ mergeParams: true });

router.post("/{:commentId}", isAuthenticated, CommentController.createComment);
router.get("/:id", CommentController.getCommentById);

export default router;
