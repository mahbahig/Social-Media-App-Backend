import { IUser } from "../../shared/interfaces";
import { SafeUserDTO } from "./auth.dto";

export class AuthAdapter {
    /**
     * @param user - Partial user object
     * @returns SafeUserDTO containing only id, username, email, and role
     */
    static toSafeUser(user: Partial<IUser>): SafeUserDTO {
        const safeUser = { id: user._id!, username: user.username!, email: user.email!, role: user.role! }
        return safeUser;
    }
}
