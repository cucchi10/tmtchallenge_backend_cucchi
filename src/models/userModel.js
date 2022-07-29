import { getConnection } from "../database/database";
import HttpError  from '../errors/HttpError';

const getById = async (userId) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT username, email FROM users WHERE id = ?", userId)
    } catch (error) {
        throw new HttpError("Internal server error")
    }
}

const getByUsername = async (username) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT id, username, email FROM users WHERE username = ?", username)
    } catch (error) {
        throw new HttpError("Internal server error")
    }
}

const verifyUser = async (username, email) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT username, email FROM users WHERE username = ? OR email = ? ", [username, email])
    } catch (error) {
        throw new HttpError("Internal server error")
    }
}

const add = async (username, email, password) => {
    try {
        const datauser = { username, email, password };
        const connection = await getConnection();
        return connection.query("INSERT INTO users SET ?", datauser);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
}

const loged = async (username) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT id, password FROM users WHERE username = ?", username)
    }catch (error) {
        throw new HttpError("Internal server error")
    }
}


module.exports = {
    getById,
    verifyUser,
    add,
    getByUsername,
    loged
};