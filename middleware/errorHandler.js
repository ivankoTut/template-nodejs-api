/**
 * Created by user on 31.01.2017.
 */
export default function (err, req, res, next) {
    let { status = 500, message = 'Server Error' } = err;

    return res.status(status).json({message});
};