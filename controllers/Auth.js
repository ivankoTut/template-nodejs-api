/**
 * Created by user on 30.01.2017.
 */
import User from '../models/User';

export const signup = async (req, res , next) => {
    const credentials = req.body;
    let user;

    try {
        user = await User.create(credentials);
    } catch ({message}){
        return next({
            status : 400,
            message,
        });
    }

    res.json(user);
};

export const signin = async (req, res , next) => {
    const { login , password } = req.body;

    const user = await User.findOne({login});

    if(!user){
        return next({
            status: 400,
            message: 'User not found!'
        });
    }

    try{
        const result = await user.comparePassword(password);
    } catch ({message}){
        console.log(message);
        return next({
            status: 400,
            message: 'Bad Credential'
        });
    }


    req.session.userId = user._id;
    res.json(user);
};