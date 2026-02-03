import express from "express";
import { sequelize } from "../config/db.js";
import { db } from "../config/index.js";

class PostService {
    async createNewPost(post)
    {
        return await db.postModel.create(post);
    }

    async getAllPosts()
    {
        return await db.postModel.findAll();
    }

    async getPostById(id)
    {
        const post = await db.postModel.findByPk(id);
        if(!post)
        {
            throw new Error("post not found");
        }
        return post;
    }

    async deletePostById(id)
    {
        const post = await this.getPostById(id);

        return await post.destroy();
    }

    async patchPostById(update, id)
    {
        if ('user_id' in update) 
        {
            delete update.user_id;
        }

        const post = await this.getPostById(id);

        for(const key in update)
        {
            if(update[key] === undefined)
            {
                delete update[key];
            }
        }

        return post.update(update);
    }

    async putPostById(update, id)
    {
        if ('user_id' in update) 
        {
            delete update.user_id;
        }

        const post = await this.getPostById(id);

        const requiredFileds = ["title", "content"];
        for(const key of requiredFileds)
        {
            if(update[key] === undefined)
            {
                throw new Error("field must not be empty");
            }
        }

        return post.update(update);
    }

}

export default new PostService();