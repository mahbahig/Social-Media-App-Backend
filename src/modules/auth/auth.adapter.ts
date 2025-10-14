import { IUser } from "../../shared/interfaces";
import { SafeUserDTO } from "./dtos";

class AuthAdapter {
    /**
     * @param {Partial<IUser>} user - Partial user object
     * @returns {SafeUserDTO} Safe user that can be sent to the user containing only id, username, email, and role
     */
    static toSafeUser(user: Partial<IUser>): SafeUserDTO {
        const safeUser = { id: user._id!, username: user.username!, email: user.email!, role: user.role! }
        return safeUser;
    }
}

export default AuthAdapter;
