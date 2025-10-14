import { UserProvider, UserRole } from '../../shared/enums';
import { generateOtp, hashValue } from "../../utils";
import { RegisterDTO } from './dtos';
import UserEntity from './user.entity';

class AuthFactory {
    async register(registerDTO: RegisterDTO) {
        const user = new UserEntity()
        user.username = registerDTO.username;
        user.email = registerDTO.email;
        user.password = await hashValue({ plainText: registerDTO.password });
        user.age = registerDTO.age;
        user.gender = registerDTO.gender;
        user.role = UserRole.user;
        user.provider = UserProvider.local;
        user.confirmed = false;
        user.otp = generateOtp();
        user.otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
        return user;
    }
}

export default AuthFactory;