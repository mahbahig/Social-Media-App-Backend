import { ObjectId, Types } from "mongoose";
import { BadRequestException, NotFoundException } from "../../utils";
import { UserRepository, UserRequestRepository } from "../../db";
import { UserRequestStatus, UserRequestType } from "../../shared";

class UserService {
    private readonly _userRepository = new UserRepository();
    private readonly _userRequestRepository = new UserRequestRepository();
    /********************************* Add Friend *********************************/
    sendFriendRequest = async (userId: ObjectId, friendId: string) => {
        // Validate friend id
        if (!Types.ObjectId.isValid(friendId)) throw new BadRequestException("Invalid user ID");
        // Handle self request case
        if (userId.toString() === friendId) throw new BadRequestException("Cannot add yourself as a friend");
        // Check if friend exists
        if (!(await this._userRepository.exists({ _id: friendId }))) throw new NotFoundException("User not found");
        // Check if users are already friends
        if (await this._userRepository.exists({ _id: userId, friends: friendId })) throw new BadRequestException("User is already your friend");
        // Check if user has blocked the friendId
        if (await this._userRepository.exists({ _id: userId, blocked: friendId })) throw new BadRequestException("Cannot send friend request to a blocked user");
        // Check if friend has blocked the userId
        if (await this._userRepository.exists({ _id: friendId, blocked: userId })) throw new BadRequestException("Cannot send friend request to this user");
        // Check for existing friend request
        if (
            await this._userRequestRepository.exists({
                sender: userId,
                receiver: friendId,
                type: UserRequestType.friendRequest,
                status: UserRequestStatus.pending,
            })
        )
            throw new BadRequestException("Friend request already sent");

        // Create friend request
        await this._userRequestRepository.create({
            sender: new Types.ObjectId(userId.toString()),
            receiver: new Types.ObjectId(friendId),
            type: UserRequestType.friendRequest,
        });
    };
    /********************************* Accept Friend Request *********************************/
    acceptFriendRequest = async (requestId: string) => {
        // Validate request id
        if (!Types.ObjectId.isValid(requestId)) throw new BadRequestException("Invalid request ID");

        const request = await this._userRequestRepository.exists({ _id: requestId });
        // Handle request not found
        if (!request) throw new NotFoundException("Friend request not found");

        // Update request status to accepted
        await this._userRequestRepository.updateOne({ _id: requestId }, { $set: { status: UserRequestStatus.accepted } });

        // Add users to each other's friends list
        await this._userRepository.updateById(request.sender, { $addToSet: { friends: request.receiver } });
        await this._userRepository.updateById(request.receiver, { $addToSet: { friends: request.sender } });
    };
    /********************************* Reject Friend Request *********************************/
    rejectFriendRequest = async (requestId: string) => {
        // Validate request id
        if (!Types.ObjectId.isValid(requestId)) throw new BadRequestException("Invalid request ID");

        const request = await this._userRequestRepository.exists({ _id: requestId });
        // Handle request not found
        if (!request) throw new NotFoundException("Friend request not found");

        // Update request status to accepted
        await this._userRequestRepository.updateOne({ _id: requestId }, { $set: { status: UserRequestStatus.rejected } });
    };
    /********************************* Remove Friend *********************************/
    removeFriend = async (userId: ObjectId, friendId: string) => {
        // Validate friend id
        if (!Types.ObjectId.isValid(friendId)) throw new BadRequestException("Invalid friend ID");
        // Check if friend exists
        if (!(await this._userRepository.exists({ _id: friendId }))) throw new NotFoundException("User not found");
        // Check if users are friends
        if (!(await this._userRepository.exists({ _id: userId, friends: friendId }))) throw new BadRequestException("User is not your friend");

        // Remove friend from user's friends list
        await this._userRepository.updateOne({ _id: userId }, { $pull: { friends: new Types.ObjectId(friendId) } });
        // Remove user from friend's friends list
        await this._userRepository.updateOne({ _id: friendId }, { $pull: { friends: userId } });
    };
    /********************************* Block User *********************************/
    blockUser = async (userId: ObjectId, blockedId: string) => {
        // Validate friend id
        if (!Types.ObjectId.isValid(blockedId)) throw new BadRequestException("Invalid user ID");
        // Check if blocked user exists
        if (!(await this._userRepository.exists({ _id: blockedId }))) throw new NotFoundException("User not found");

        // Remove blocked user from user's friends list if they are friends
        if (await this._userRepository.exists({ _id: userId, friends: blockedId })) {
            await this._userRepository.updateOne({ _id: userId }, { $pull: { friends: blockedId } });
            await this._userRepository.updateOne({ _id: blockedId }, { $pull: { friends: userId } });
        }

        // Add blocked user to user's blocked list
        await this._userRepository.updateOne({ _id: userId }, { $addToSet: { blocked: blockedId } });
    };
    /********************************* Unblock User *********************************/
    unblockUser = async (userId: ObjectId, blockedId: string) => {
        // Validate friend id
        if (!Types.ObjectId.isValid(blockedId)) throw new BadRequestException("Invalid user ID");
        // Check if blocked user exists
        if (!(await this._userRepository.exists({ _id: blockedId }))) throw new NotFoundException("User not found");
        // Check if user has blocked the blockedId
        if (!(await this._userRepository.exists({ _id: userId, blocked: blockedId }))) throw new BadRequestException("User is not blocked");

        // Remove blocked user from user's blocked list
        await this._userRepository.updateOne({ _id: userId }, { $pull: { blocked: blockedId } });
    };
}

export default new UserService();