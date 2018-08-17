import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

export interface userModel extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    id: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})

const user = mongoose.model("user", userSchema)

function getUserByEmail(email: string, callback: (err: any, product: userModel) => void) {
    const query = {
        email: email
    };
    user.findOne(query, callback);
};

function registerUser(newUser: userModel, callback: (err: any, product: userModel) => void) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

function getUserById(id: string, callback: (err: any, product: userModel) => void) {
    user.findById(id, callback);
};

function comparePassword(candidatePassword: string, hash: string, callback: (err: any, isMatch: boolean) => void) {
    bcrypt.compare(candidatePassword, hash, callback);
};

export {userSchema, user, registerUser, getUserByEmail, getUserById, comparePassword }

