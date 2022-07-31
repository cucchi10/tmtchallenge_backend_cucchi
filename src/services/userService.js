import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel'
import HttpError from '../errors/HttpError';

const hashPassword = (password) => {
    return bcryptjs.hash(password, 8)
}

const addUser = async ({ email, password, username }) => {
    const user = await userModel.verifyUser(username, email)
    if (user.length) {
        throw new HttpError("User is allready exist", 400)
    }

    const hashedPassword = await hashPassword(password);
    await userModel.add(username, email, hashedPassword)
    return { username, email }
}

const loginUser = async (username, password, res) => {

    const user = await userModel.loged(username)
    
    if (!user.length || !(await bcryptjs.compare(password, user[0].password))) {
        throw new HttpError("Incorrect Fields.", 400);
    } else {
        //login ok
        const id = user[0].id
        //token infinito
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET)
        console.log(`TOKEN: ${token} -- USUARIO: ${username}`)
        const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), httpOnly: true
        }
        res.cookie('jwt', token, cookiesOptions)
        return {
            token: token,
            user: username
        }
    };
}

module.exports = {
    addUser,
    loginUser
};


