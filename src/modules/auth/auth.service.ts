import { UserRepository } from "../../db/repositories/user.repository";
import { BadRequestException, compareHash, ConflictException, emailEventEmitter, generateToken, hashValue, NotFoundException } from "../../utils";
import { ConfirmEmailDTO, LoginDTO, RegisterDTO, SafeUserDTO } from "./auth.dto";
import AuthFactory from "./auth.factory";
import { AuthAdapter } from "./auth.adapter";
import { IUser } from "../../shared/interfaces";
import { devConfig } from "../../config/dev.config";

class AuthService {
    private _user = new UserRepository();
    private _authFactory = new AuthFactory();

    /********************************* Register *********************************/
    register = async (registerDTO: RegisterDTO) => {
        // Handle existing email
        if (await this._user.exists({ email: registerDTO.email })) throw new ConflictException("Email already exists");
        // Handle password mismatch
        if (registerDTO.password !== registerDTO.confirmPassword) throw new BadRequestException("Passwords do not match");

        // Create user object
        const user = await this._authFactory.register(registerDTO);
        // Send confirmation email
        emailEventEmitter.emit("confirmEmail", { to: user.email, otp: user.otp });

        // Hash otp before saving to database
        user.otp = await hashValue({ plainText: user.otp });

        // Create user and save to database
        const createdUser: Partial<IUser> = await this._user.create(user);

        // Create safe user object to create jwt token
        const safeUser: SafeUserDTO = AuthAdapter.toSafeUser(createdUser);

        return this.createTokens(safeUser);
    };

    /********************************* Confirm Email *********************************/
    confirmEmail = async (confirmEmailDTO: ConfirmEmailDTO) => {
        // Get user by email
        const user = await this._user.findOne({ email: confirmEmailDTO.email });

        // Handle user not found
        if (!user) throw new NotFoundException("User not found");
        // Handle already verified email
        if (user.confirmed) throw new BadRequestException("Email already verified");
        // Handle missing OTP
        if (!user.otp) throw new BadRequestException("OTP not found, please request a new one");
        // Handle expired OTP
        if (user.otpExpiration && user.otpExpiration < new Date()) throw new BadRequestException("OTP has expired, please request a new one");
        // Handle invalid OTP
        if (!(await compareHash({ plainText: confirmEmailDTO.otp, cipherText: user.otp }))) throw new BadRequestException("Invalid OTP");

        // Remove the otp from the confirmEmailDTO for enhanced security
        confirmEmailDTO.otp = "";

        // Update user to set confirmed to true and remove otp and otpExpiration
        await this._user.updateById(user._id, {
            $set: { confirmed: true },
            $unset: { otp: "", otpExpiration: "" },
        });
    };

    /********************************* Login *********************************/
    login = async (loginDTO: LoginDTO) => {
        // Get user by email
        const user = await this._user.exists({ email: loginDTO.email });

        // Handle user not found
        if (!user) throw new NotFoundException("User not found");
        // Handle invalid password
        if (!(await compareHash({ plainText: loginDTO.password, cipherText: user.password }))) throw new BadRequestException("Invalid password");

        // Create safe user object to create jwt token
        const safeUser: SafeUserDTO = AuthAdapter.toSafeUser(user);

        return this.createTokens(safeUser);
    };

    createTokens = (safeUser: SafeUserDTO) => {
        const accessToken: string = generateToken({ payload: safeUser, key: devConfig.USER_ACCESS_JWT_SECRET!, options: { expiresIn: "7d" } });
        const refreshToken: string = generateToken({ payload: { id: safeUser.id }, key: devConfig.USER_REFRESH_JWT_SECRET!, options: { expiresIn: "7d" } });
        return { accessToken, refreshToken };
    };
}

export default new AuthService();
