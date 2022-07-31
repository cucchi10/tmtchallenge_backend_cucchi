import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import postModel from './../models/postModel';
import HttpError from '../errors/HttpError';


const getPosts = () => {
    try {
        return postModel.getAll()
    } catch (error) {
        return error
    }

}

const getPost = async (id) => {
    const post = await postModel.get(id)

    if (!post.length) {
        throw new HttpError("post is not found", 404)
    }

    return post[0]
}

const getPostsByUser = async (username) => {
    const user = await userModel.getByUsername(username)
    if (!user.length) {
        throw new HttpError("User not found", 404)
    }

    return await postModel.getAllByUser(user[0].id)
}



const addPost = async (title, content, token) => {
    const userToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = userToken.id
    const user = await userModel.getById(userId)

    if (!user.length) {
        throw new HttpError("User is invalid", 404)
    }

    const post = { title, content, author_id: userId }
    await postModel.add(post)

    return ({ ...post, userName: user[0].username });

}

const updatePost = async (id, title, content, token) => {
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = userToken.id;

    const post = await postModel.getByUser(id, userId)
    if (!post.length) {
        throw new HttpError("post is not found", 404)
    }

    const updatedValues = { title: title || post[0].title, content: content || post[0].content }
    const updatedpost = { ...post[0], ...updatedValues }
    await postModel.update(updatedpost, id, userId)
    return updatedpost
}

const deletePost = async (id, token) => {
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = userToken.id;

    const post = await postModel.del(id, userId)
    if (!post.affectedRows) {
        throw new HttpError("post is not found", 404)
    }

    return
}




module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
    getPostsByUser
};