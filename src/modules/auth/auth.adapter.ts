import { IUser } from "../../shared/interfaces";

export class AuthAdapter {
    static toSafeUser(user: Partial<IUser>) {
        const safeUser = { username: user.username, email: user.email, age: user.age, gender: user.gender, role: user.role }
        return safeUser;
    }
}
