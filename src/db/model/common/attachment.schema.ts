import { Schema } from "mongoose";

export const attachmentSchema = new Schema({
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });