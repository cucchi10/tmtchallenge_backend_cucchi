import { getConnection } from "../database/database";
import HttpError from '../errors/HttpError';

const getAll = async () => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT posts.id, creation, title, content, users.username FROM posts INNER JOIN users ON users.id = posts.author_id ORDER BY creation ASC");
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const get = async (id) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT posts.id, creation, title, content, users.username FROM posts INNER JOIN users ON users.id = posts.author_id WHERE posts.id = ?", id);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const getByUser = async (postId ,userId) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT id, creation, title, content FROM posts WHERE author_id = ? AND id = ?", [userId, postId]);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};


const getAllByUser = async (userId) => {
    try {
        const connection = await getConnection();
        return connection.query("SELECT posts.id, creation, title, content, users.username FROM posts INNER JOIN users ON users.id = posts.author_id WHERE author_id = ?", userId);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const add = async (post) => {
    try {
        const connection = await getConnection();
        return connection.query("INSERT INTO posts SET ?", post);
    } catch (error) {
        throw new HttpError("Internal server error")
    }
};

const update = async (post, id, userId) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("UPDATE posts SET ? WHERE id = ? AND author_id = ?", [post, id, userId]);
    }catch (error) {
        throw new HttpError("Internal server error")
    }
}

const del = async (id, userId) => {
    try {
        const connection = await getConnection();
        return connection.query("DELETE FROM posts WHERE id = ? AND author_id = ?", [id, userId]);
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

