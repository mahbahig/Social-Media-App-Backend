import { UserRepository } from "../../db/repositories/user.repository";
import { BadRequestException, compareHash, ConflictException, emailEventEmitter, hashValue, NotFoundException } from "../../utils";
import { ConfirmEmailDTO, LoginDTO, RegisterDTO, SafeUserDTO } from "./auth.dto";
import AuthFactory from "./auth.factory";
import { IUser } from "../../shared/interfaces";
import AuthProvider from "./auth.provider";
import AuthAdapter from "./auth.adapter";

class AuthService {
    private _userRepository = new UserRepository();
    private _authFactory = new AuthFactory();

    /********************************* Register *********************************/
    register = async (registerDTO: RegisterDTO) => {
        // Handle existing email
        if (await this._userRepository.exists({ email: registerDTO.email })) throw new ConflictException("Email already exists");
        // Handle password mismatch
        if (registerDTO.password !== registerDTO.confirmPassword) throw new BadRequestException("Passwords do not match");

        // Create user object
        const user = await this._authFactory.register(registerDTO);
        // Send confirmation email
        emailEventEmitter.emit("confirmEmail", { to: user.email, otp: user.otp });

        // Hash otp before saving to database
        user.otp = await hashValue({ plainText: user.otp });

        // Create user and save to database
        const createdUser: Partial<IUser> = await this._userRepository.create(user);

        // Create safe user object to create jwt token
        const safeUser: SafeUserDTO = AuthAdapter.toSafeUser(createdUser);

        return AuthProvider.createTokens(safeUser);
    };

    /********************************* Confirm Email *********************************/
    confirmEmail = async (confirmEmailDTO: ConfirmEmailDTO) => {
        const user = await AuthProvider.checkOtp(confirmEmailDTO);

        // Update user to set confirmed to true and remove otp and otpExpiration
        await this._userRepository.updateById(user._id, {
            $set: { confirmed: true },
            $unset: { otp: "", otpExpiration: "" },
        });
    };

    /********************************* Login *********************************/
    login = async (loginDTO: LoginDTO) => {
        // Get user by email
        const user = await this._userRepository.exists({ email: loginDTO.email });

        // Handle user not found
        if (!user) throw new NotFoundException("User not found");
        // Handle invalid password
        if (!(await compareHash({ plainText: loginDTO.password, cipherText: user.password }))) throw new BadRequestException("Invalid password");

        // Create safe user object to create jwt token
        const safeUser: SafeUserDTO = AuthAdapter.toSafeUser(user);

        return AuthProvider.createTokens(safeUser);
    };
}

export default new AuthService();
