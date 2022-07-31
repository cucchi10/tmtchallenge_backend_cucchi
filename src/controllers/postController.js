import postService from './../services/postService';
import HttpError from '../errors/HttpError';

const getPosts = async (req, res) => {
    try {
        const result = await postService.getPosts()
        res.send(result);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const getPostsByUser = async (req, res) => {
    try {
        const { userName } = req.params;
        const result = await postService.getPostsByUser(userName)
        res.status(200).send(result);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await postService.getPost(id)
        res.send(result);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const addPost = async (req, res) => {
    try {
        const {title, content } = req.body;
        const {authorization} = req.headers
       
        if(!authorization) {
            throw new HttpError("Authorization token is required", 409)
        }

        if ( !title || !content) {
            throw new HttpError("Please fill all field", 400);
        }

        const result = await postService.addPost(title, content, authorization)
        res.send(result)

    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const updatePost = async (req, res) => {
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

        const result = await postService.updatePost(id, title, content, authorization)
        res.status(200).send(result);
        
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const {authorization} = req.headers;

        if(!authorization) {
            throw new HttpError("Authorization token is required", 409)
        }

        await postService.deletePost(id, authorization)
        res.status(200).send("post deleted correctly")
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
    getPostsByUser
};