import { UserGender, UserProvider, UserRole } from "../../shared/enums"

class UserEntity {
    public username!: string;
    public email!: string;
    public password!: string;
    public age: number | undefined;
    public gender!: UserGender | undefined;
    public role!: UserRole;
    public provider!: UserProvider;
    public isVerified!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
    public otp!: string;
    public otpExpiration!: Date;
}

export default UserEntity;