import mongoose from "mongoose";
import { IUser } from "../../modules/user/user.interface";

export enum UserRole {
    user = "user",
    admin = "admin"
};
export enum UserGender {
    male = "male",
    female = "female",
};
export enum UserProvider {
    system = "system",
    google = "google",
};

const userSchema = new mongoose.Schema<IUser>({
    firstName: { 
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: UserGender
    },
    profilePicture: String,
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.user
    },
    provider: {
        type: String,
        enum: UserProvider,
        default: UserProvider.system
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { 
    timestamps: true,
    strict: true,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual("username").set(function(value) {
    const [firstName, lastName] = value.split(' ');
    if (!lastName) {
        this.set({ firstName, lastName: '' });
    }
    this.set({ firstName, lastName });
}).get(function() {
    if (!this.lastName) {
        return this.firstName;
    }
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;