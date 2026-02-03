import express from "express"
import PostService from "../services/post.service.js"


class PostController {

    async postNewPost(req, res, next)
    {
        try{
            await PostService.createNewPost(req.body);
            res.status(200).send("new post created\n");
        }catch(err)
        {
            next(err);
        }
    }

    async getAllPosts(req, res, next)
    {
        try{
            const result = await PostService.getAllPosts();
            res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }

    async getPostByid(req, res, next)
    {
        try{
            const id = req.params.id;
            const result = await PostService.getPostById(id);
            res.status(200).send(result);
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
            res.status(200).send("post deleted");
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
            res.status(200).send(result);
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
            res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }
}


export default new PostController();