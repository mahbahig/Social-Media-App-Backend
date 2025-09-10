import User from "../../db/model/user.model";
import { SignupInputSchema } from "./user.validation";
import { UserRepository } from "../../db/repositories/user.repository";
import { AppError } from "../../middlewares";
import { GenerateOtp, Hash } from "../../utils";
import { IUser } from "./user.interface";
import emailEventEmitter from "../../utils/emailEvents";

class UserService {
    private _user = new UserRepository(User);
    // =============== Signup ===============
    signup = async ({ username, email, gender, age, password, confirmPassword }: SignupInputSchema) => {
        if (await this._user.findOne({ email })) {
            throw new AppError("Email already exists", 409);
        }

        // Handle password mismatch
        if (password !== confirmPassword) {
            throw new AppError("Passwords do not match", 400);
        }

        // Hash Password
        const hashedPassword: string = await Hash({ plainText: password });
        
        const otp = GenerateOtp();
        console.log("OTP:", otp);
        emailEventEmitter.emit("confirmEmail", ({ to: email, otp }));
        
        const user: IUser = await this._user.createOneUser({ username, email, gender, age, password: hashedPassword });
        return user;
    }
}

export default new UserService();