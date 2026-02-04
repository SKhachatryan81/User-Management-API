import express from "express"
import PostService from "../services/post.service.js"


class PostController {

    async postNewPost(req, res, next)
    {
        try{
            const newPost = await PostService.createNewPost(req.body);
            if(!newPost)
            {
                const error = new Error("Failed to create a new post");
                error.status = 500;
                throw error;
            }
            return res.status(200).send("new post created\n");
        }catch(err)
        {
            next(err);
        }
    }

    async getAllPosts(req, res, next)
    {
        try{
            const result = await PostService.getAllPosts();
            if(!result || result.length === 0)
            {
                const error = new Error("Post not found");
                error.status = 404;
                throw error;
            }
            return res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }

    async getPostByid(req, res, next)
    {
        try{
            const id = Number(req.params.id);
            const result = await PostService.getPostById(id);
            if(!result)
            {
                const error = new Error("Post not found");
                error.status = 404;
                throw error;
            }
            return res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }

    async deletePostById(req, res, next)
    {
        try{
            const id = Number(req.params.id);
            const result = await PostService.deletePostById(id);
            if(!result)
            {
                const error = new Error("Failed to delete");
                error.status = 500;
                throw error;
            }
            
            return res.status(200).send("post deleted");
        }catch(err)
        {
            next(err);
        }
    }

    async patchPostById(req, res, next)
    {
        try{
            const id = Number(req.params.id);
            const result = await PostService.patchPostById(req.body, id);
            if(!result)
            {
                const error = new Error("Failed to patch");
                error.status = 500;
                throw error;
            }
            return res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }

    async putPostById(req, res, next)
    {
        try{
            const id = Number(req.params.id);
            const result = await PostService.putPostById(req.body, id);
            if(!result)
            {
                const error = new Error("Failed to put");
                error.status = 500;
                throw error;
            }
            return res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }
}


export default new PostController();