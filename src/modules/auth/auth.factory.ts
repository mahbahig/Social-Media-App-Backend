import { UserProvider, UserRole } from '../../shared/enums';
import { GenerateOtp, Hash } from '../../utils';
import { RegisterDTO } from './auth.dto';
import UserEntity from './user.entity';

class AuthFactory {
    async register(registerDTO: RegisterDTO) {
        const user = new UserEntity()
        user.username = registerDTO.username;
        user.email = registerDTO.email;
        user.password = await Hash({ plainText: registerDTO.password });
        user.age = registerDTO.age;
        user.gender = registerDTO.gender;
        user.role = UserRole.user;
        user.provider = UserProvider.local;
        user.isVerified = false;
        user.otp = GenerateOtp();
        user.otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return user;
    }
}

export default AuthFactory;