import { devConfig } from "../../config/dev.config";
import { UserRepository } from "../../db";
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
     * @return {Promise<void>} Resolves if OTP is valid, otherwise throws an error
     * @throws NotFoundException if user is not found
     * @throws BadRequestException if email is already verified, OTP is missing, expired, or invalid
     */
    static async checkOtp({ email, otp }: { email: string; otp: string }): Promise<void> {
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
    }

    /**
     * Creates access token for a given safe user object.
     * Generates JWT tokens using the user's details (id, name, email, role) and predefined secret keys and expiration settings.
     * The access token contains full safe user information.
     *
     * @async
     * @function createToken
     * @param {SafeUserDTO} safeUser - The user object containing safe user details (id, name, email, role)
     * @returns {Promise<{accessToken}>} An object containing the generated access token.
     * @returns {string} returns.accessToken - JWT access token containing full user payload, expires in 7 days
     */
    static async createToken(user: SafeUserDTO) {
        const accessToken: string = generateToken({ payload: user, key: devConfig.USER_ACCESS_JWT_SECRET!, options: { expiresIn: "7d" } });
        return accessToken;
    }
}

export default AuthProvider;
