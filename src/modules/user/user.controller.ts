import { Request, Response } from "express";
import UserService from "./user.service";

class UserController {
    /********************************* Get Profile *********************************/
    getProfile = async (req: Request, res: Response) => {
        const user = req.user;
        res.status(200).json({ user });
    };
    /********************************* Add Friend *********************************/
    sendFriendRequest = async (req: Request, res: Response) => {
        const { friendId } = req.params;
        await UserService.sendFriendRequest(req.user!._id, friendId!);
        res.status(200).json({ message: "Friend request sent" });
    };
    /********************************* Accept Friend Request *********************************/
    acceptFriendRequest = async (req: Request, res: Response) => {
        const { requestId } = req.params;
        await UserService.acceptFriendRequest(requestId!);
        res.status(200).json({ message: "Friend request accepted" });
    };
    /********************************* Reject Friend Request *********************************/
    rejectFriendRequest = async (req: Request, res: Response) => {
        const { requestId } = req.params;
        await UserService.acceptFriendRequest(requestId!);
        res.status(200).json({ message: "Friend request accepted" });
    };
    /********************************* Remove Friend *********************************/
    removeFriend = async (req: Request, res: Response) => {
        const { friendId } = req.params;
        await UserService.removeFriend(req.user!._id, friendId!);
        res.status(200).json({ message: "Friend removed" });
    };
    /********************************* Block User *********************************/
    blockUser = async (req: Request, res: Response) => {
        const { blockedId } = req.params;
        await UserService.blockUser(req.user!._id, blockedId!);
        res.status(200).json({ message: "User blocked" });
    };
    /********************************* Unlock User *********************************/
    unblockUser = async (req: Request, res: Response) => {
        const { blockedId } = req.params;
        await UserService.unblockUser(req.user!._id, blockedId!);
        res.status(200).json({ message: "User unblocked" });
    };
}

export default new UserController();
