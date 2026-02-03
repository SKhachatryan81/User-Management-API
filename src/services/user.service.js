import express from "express";
import { sequelize } from "../config/db.js";
import { db } from "../config/index.js";



class UserService {
    async getAllUsers()
    {
        return await db.userModel.findAll()
    }

    async getUserById(id)
    {
        return await db.userModel.findByPk(id);
    }

    async postNewUser(user)
    {
        return await db.userModel.create(user);
    }

    async putUserById(updates, id)
    {
        const user = await this.getUserById(id);
        if(!user)
        {
            throw new Error("user not found!");
            
        }

        // const requiredFields = ["name", "age", "occupation", "username"];

        // for(let key in requiredFields)
        // {
        //     if (updates[key] === undefined || !(key in updates))
        //     {
        //         throw new Error("no field should remain empty!");
        //     }
        // }

        return await user.update(updates)
    }

    async patchUserById(updates, id)
    {
        const user = await this.getUserById(id);
        if(!user)
        {
            throw new Error("user not found");
        }

        const requiredFields = ["name", "age", "occuaption", "username"];

        for(const key in requiredFields)
        {
            if(updates[key] === undefined)
            {
                delete updates[key];
            }
        }

        return await user.update(updates);
    }

    async deleteUserById(id)
    {
        const user = await this.getUserById(id);
        if(!user) 
        {
            throw new Error("user not found");
        }

        return await user.destroy();
    }
}

export default new UserService();