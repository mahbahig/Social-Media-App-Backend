import { UserRepository } from "../../db/repositories/user.repository";
import { BadRequestException, ConflictException, emailEventEmitter } from "../../utils";
import { RegisterDTO } from "./auth.dto";
import AuthFactory from "./auth.factory";
import { AuthAdapter } from "./auth.adapter";
import { IUser } from "../../shared/interfaces";

class AuthService {
    private _user = new UserRepository();
    private _authFactory = new AuthFactory();

    // ============================== Register ==============================
    register = async (registerDTO: RegisterDTO) => {
        if (await this._user.exists({ email: registerDTO.email })) {
            throw new ConflictException("Email already exists");
        }

        // Handle password mismatch
        if (registerDTO.password !== registerDTO.confirmPassword) {
            throw new BadRequestException("Passwords do not match");
        }

        const user = await this._authFactory.register(registerDTO);
        emailEventEmitter.emit("confirmEmail", ({ to: user.email, otp: user.otp }));
        
        const createdUser: Partial<IUser> = await this._user.create(user);
        return AuthAdapter.toSafeUser(createdUser);
    }
}

export default new AuthService();