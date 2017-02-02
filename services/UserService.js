/**
 * Created by user on 02.02.2017.
 */
import User from '../models/User';

export async function getUserByToken(token){
    const { _id } = token;

    try {
        var user = await User.findOne({_id}, {password: 0});
    } catch (e) {
        throw e;
    }

    return user;
}