import { Router } from "express";
import { isAuthenticated } from "../../middlewares";
import UserController from "./user.controller";

const router = Router({ caseSensitive: true, strict: true });

router.get("/profile", isAuthenticated, UserController.getProfile);
router.patch("/send-friend-request/:friendId", isAuthenticated, UserController.sendFriendRequest);
router.patch("/accept-friend-request/:requestId", isAuthenticated, UserController.acceptFriendRequest);
router.patch("/reject-friend-request/:requestId", isAuthenticated, UserController.rejectFriendRequest);
router.patch("/remove-friend/:friendId", isAuthenticated, UserController.removeFriend);
router.patch("/block-user/:blockedId", isAuthenticated, UserController.blockUser);
router.patch("/unblock-user/:blockedId", isAuthenticated, UserController.unblockUser);

export default router;