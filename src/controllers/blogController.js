import { getConnection } from "../database/database";
import blogService from './../services/blogService';
import HttpError from '../errors/HttpError';

const getBlogs = async (req, res) => {
    try {
        const result = await blogService.getBlogs()
        res.send(result);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const getBlogsByUser = async (req, res) => {
    try {
        const { userName } = req.params;
        const result = await blogService.getBlogsByUser(userName)
        res.status(200).send(result);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await blogService.getBlog(id)
        res.send(result);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const addBlog = async (req, res) => {
    try {
        const {title, content } = req.body;
        const {authorization} = req.headers
       
        if(!authorization) {
            throw new HttpError("Authorization token is required", 409)
        }

        if ( !title || !content) {
            throw new HttpError("Please fill all field", 400);
        }

        const result = await blogService.addBlog(title, content, authorization)
        res.send(result)

    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, content} = req.body;
        const {authorization} = req.headers;

        if(!authorization) {
            throw new HttpError("Authorization token is required", 409)
        }

        if (!title && !content) {
            throw new HttpError("Please fill all fields",400);
        }

        const result = await blogService.updateBlog(id, title, content, authorization)
        res.status(200).send(result);
        
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {authorization} = req.headers;

        if(!authorization) {
            throw new HttpError("Authorization token is required", 409)
        }

        await blogService.deleteBlog(id, authorization)
        res.status(200).send("Blog deleted correctly")
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

module.exports = {
    getBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogsByUser
};