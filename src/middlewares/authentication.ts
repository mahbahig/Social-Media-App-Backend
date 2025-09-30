import { UserRepository } from './../db/repositories/user.repository';
import { NextFunction, Request, Response } from "express";
import { BadRequestException, NotFoundException, verifyToken } from "../utils";
import { devConfig } from "../config/dev.config";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const authorization: string = req.headers.authorization as string;

    if (!authorization) throw new NotFoundException("Authorization token is missing");

    const [prefix, token] = authorization.split(" ");
    if (!prefix || !token) throw new BadRequestException("Invalid authorization token format");

    let decoded: any = {};
    if (prefix == "Bearer" || prefix == "bearer") {
        decoded = verifyToken({ token });
    } else if (prefix === "Admin" || prefix === "admin") {
        decoded = verifyToken({ token, key: devConfig.ADMIN_ACCESS_JWT_SECRET });
    } else { throw new BadRequestException("Invalid authorization token prefix"); }

    if (!decoded) throw new BadRequestException("Invalid authorization token");

    const _userRepository = new UserRepository();
    const userExists = await _userRepository.exists({ _id: decoded.id });
    if (!userExists) throw new NotFoundException("User not found");

    req.user = userExists;
    next();
}