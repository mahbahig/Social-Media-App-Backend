import { Router } from "express";
import CommentController from "./comment.controller";
import { isAuthenticated } from "../../middlewares";

const router = Router({ mergeParams: true });

router.post("/{:commentId}", isAuthenticated, CommentController.createComment);
router.get("/:id", CommentController.getCommentById);
router.put("/:id", isAuthenticated, CommentController.updateComment);
router.delete("/:id", isAuthenticated, CommentController.deleteComment);

export default router;
