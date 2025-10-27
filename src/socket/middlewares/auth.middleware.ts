import { Socket } from "socket.io";
import { BadRequestException, NotFoundException, verifyToken } from "../../utils";
import { UserRepository } from "../../db";

export const authSocketMiddleware = (socket: Socket, next: Function) => {
    const { authorization } = socket.handshake.auth;
    const token = authorization?.split(" ")[1];
    if (!token) throw new BadRequestException("Authentication token is missing");
    const payload = verifyToken({ token });
    const _userRepository = new UserRepository();
    if (typeof payload == "string") throw new BadRequestException("Invalid authentication token");
    const user = _userRepository.findById(payload.id);
    if (!user) throw new NotFoundException("User not found");
    socket.data.user = user;
    next();
};