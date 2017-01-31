/**
 * Created by user on 30.01.2017.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: { type: String , unique: true, lowercase: true, index:true },
    password: String
});

UserSchema.pre("save" , async function (next) {
    if( !this.isModified('password') ){
        return next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.comparePassword = function (password) {
    console.log(11111);
    return bcrypt.compare(password,this.password);
};

export default mongoose.model('User',UserSchema);