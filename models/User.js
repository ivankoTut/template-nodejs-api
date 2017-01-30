/**
 * Created by user on 30.01.2017.
 */

import mongoose,{ Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    login: { type: String , unique: true, lowercase: true, index:true },
    password: String
});

UserSchema.pre("save" , async function (next) {
    if( !this.isModified('password') ){
        return next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password,this.password);
};

export default mongoose.model('User',UserSchema);