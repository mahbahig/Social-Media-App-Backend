import { UserGender, UserProvider, UserRole } from "../../shared/enums"

class UserEntity {
    public username!: string;
    public email!: string;
    public password!: string;
    public age: number | undefined;
    public gender!: UserGender | undefined;
    public role!: UserRole;
    public provider!: UserProvider;
    public confirmed!: boolean;
    public otp!: string;
    public otpExpiration!: Date;
}

export default UserEntity;