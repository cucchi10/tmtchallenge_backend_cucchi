import jwt from 'jsonwebtoken';
import userModel from './../models/userModel';
import blogModel from './../models/blogModel';
import HttpError from '../errors/HttpError';


const getBlogs = () => {
    try {
        return blogModel.getAll()
    } catch (error) {
        return error
    }

}

const getBlog = async (id) => {
    const blog = await blogModel.get(id)

    if (!blog.length) {
        throw new HttpError("Blog is not found", 404)
    }

    return blog[0]
}

const getBlogsByUser = async (username) => {
    const user = await userModel.getByUsername(username)
    if (!user.length) {
        throw new HttpError("User not found", 404)
    }

    return await blogModel.getAllByUser(user[0].id)
}



const addBlog = async (title, content, token) => {
    const userToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = userToken.id
    const user = await userModel.getById(userId)

    if (!user.length) {
        throw new HttpError("User is invalid", 404)
    }

    const blog = { title, content, author_id: userId }
    await blogModel.add(blog)

    return ({ ...blog, userName: user[0].username });

}

const updateBlog = async (id, title, content, token) => {
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = userToken.id;

    const blog = await blogModel.getByUser(id, userId)
    if (!blog.length) {
        throw new HttpError("Blog is not found", 404)
    }

    const updatedValues = { title: title || blog[0].title, content: content || blog[0].content }
    const updatedBlog = { ...blog[0], ...updatedValues }
    await blogModel.update(updatedBlog, id, userId)
    return updatedBlog
}

const deleteBlog = async (id, token) => {
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = userToken.id;

    const blog = await blogModel.del(id, userId)
    if (!blog.affectedRows) {
        throw new HttpError("Blog is not found", 404)
    }

    return
}




module.exports = {
    getBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogsByUser
};