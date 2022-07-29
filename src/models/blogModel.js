import { getConnection } from "../database/database";
import HttpError from '../errors/HttpError';

const getAll = async () => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT blogs.id, creation, title, content, users.username FROM blogs INNER JOIN users ON users.id = blogs.author_id ORDER BY creation ASC");
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const get = async (id) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT blogs.id, creation, title, content, users.username FROM blogs INNER JOIN users ON users.id = blogs.author_id WHERE blogs.id = ?", id);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const getByUser = async (blogId ,userId) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT id, creation, title, content FROM blogs WHERE author_id = ? AND id = ?", [userId, blogId]);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};


const getAllByUser = async (userId) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT blogs.id, creation, title, content, users.username FROM blogs INNER JOIN users ON users.id = blogs.author_id WHERE author_id = ?", userId);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const add = async (blog) => {
    try {
        const connection = await getConnection();
        return connection.query("INSERT INTO blogs SET ?", blog);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const update = async (blog, id, userId) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("UPDATE blogs SET ? WHERE id = ? AND author_id = ?", [blog, id, userId]);
    }catch (error) {
        throw new HttpError("Internal server error")
    }
}

const del = async (id, userId) => {
    try {
        const connection = await getConnection();
        return connection.query("DELETE FROM blogs WHERE id = ? AND author_id = ?", [id, userId]);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

module.exports = {
    getAll,
    get,
    add,
    del,
    getAllByUser,
    getByUser,
    update
};

