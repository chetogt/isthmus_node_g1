import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

interface IUserSchema extends Document {
    name: string;
    email: string;
    password: string;
    date: Date;
};

export default model<IUserSchema>('User', UserSchema);