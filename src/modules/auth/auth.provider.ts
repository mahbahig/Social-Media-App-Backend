import { HydratedDocument } from "mongoose";
import { devConfig } from "../../config/dev.config";
import { UserRepository } from "../../db/repositories/user.repository";
import { IUser } from "../../shared/interfaces";
import { BadRequestException, compareHash, generateToken, NotFoundException } from "../../utils";
import { SafeUserDTO } from "./auth.dto";

class AuthProvider {
    /**
     * Validates the provided OTP against the stored hashed OTP for the user with the given email.
     * Handles various error scenarios including user not found, already verified email, missing OTP, expired OTP, and invalid OTP.
     *
     * @async
     * @function checkOtp
     * @param {Object} params - Object containing email and otp
     * @param {string} params.email - User's email
     * @param {string} params.otp - One-time password to verify
     * @returns {Promise<HydratedDocument<IUser>>} The user if OTP is valid
     * @throws NotFoundException if user is not found
     * @throws BadRequestException if email is already verified, OTP is missing, expired, or invalid
     */
    static async checkOtp({ email, otp }: { email: string; otp: string }): Promise<HydratedDocument<IUser>> {
        const _userRepository = new UserRepository();
        // Get user by email
        const user = await _userRepository.findOne({ email });
        // Handle user not found
        if (!user) throw new NotFoundException("User not found");
        // Handle already verified email
        if (user.confirmed) throw new BadRequestException("Email already verified");
        // Handle missing OTP
        if (!user.otp) throw new BadRequestException("OTP not found, please request a new one");
        // Handle expired OTP
        if (user.otpExpiration && user.otpExpiration < new Date()) throw new BadRequestException("OTP has expired, please request a new one");
        // Handle invalid OTP
        if (!(await compareHash({ plainText: otp, cipherText: user.otp }))) throw new BadRequestException("Invalid OTP");

        return user;
    }

    /**
     * Creates access and refresh tokens for a given safe user object.
     * Generates JWT tokens using the user's details (id, name, email, role) and predefined secret keys and expiration settings.
     * The access token contains full user information while the refresh token only contains the user ID for security.
     *
     * @async
     * @function createTokens
     * @param {SafeUserDTO} safeUser - The user object containing safe user details (id, name, email, role)
     * @returns {Promise<{accessToken, refreshToken}>} An object containing the generated access and refresh tokens
     * @returns {string} returns.accessToken - JWT access token containing full user payload, expires in 7 days
     * @returns {string} returns.refreshToken - JWT refresh token containing only user ID, expires in 7 days
     */
    static async createTokens(user: SafeUserDTO) {
        const accessToken: string = generateToken({ payload: user, key: devConfig.USER_ACCESS_JWT_SECRET!, options: { expiresIn: "7d" } });
        const refreshToken: string = generateToken({ payload: { id: user.id }, key: devConfig.USER_REFRESH_JWT_SECRET!, options: { expiresIn: "7d" } });
        return { accessToken, refreshToken };
    }
}

export default AuthProvider;
