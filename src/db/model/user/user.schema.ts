import { Schema } from 'mongoose';
import { UserProvider, UserGender, UserRole } from '../../../shared/enums';
import { IUser } from '../../../shared/interfaces';

export const userSchema = new Schema<IUser>({
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
        required: function () { return this.provider === UserProvider.local },
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: UserGender,
        default: UserGender.male
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
        default: UserProvider.local
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