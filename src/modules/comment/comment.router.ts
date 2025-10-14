import { Router } from "express";
import CommentController from "./comment.controller";
import { isAuthenticated } from "../../middlewares/authentication";

const router = Router({ mergeParams: true });

router.post("/{:commentId}", isAuthenticated, CommentController.createComment);

export default router;
