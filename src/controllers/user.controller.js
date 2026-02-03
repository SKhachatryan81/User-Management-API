import express from "express"
import usersService from "../services/user.service.js"

class UserController {

    async getAllUsers(req, res, next)
    {
        try
        {
            const users = await usersService.getAllUsers();
            res.json(users);
        }catch(err)
        {
            next(err);
        }
    }

    async getUserById(req, res, next)
    {
        try
        {
            const id = req.params.id;
            const user = await usersService.getUserById(id);
            res.json(user);
        }catch(err)
        {
            next(err);
        }
    }

    async postNewUser(req, res, next)
    {
        try
        {
            await usersService.postNewUser(req.body);
            res.status(200).send("new user created\n");
        }catch(err)
        {
            next(err);
        }
    }

    async deleteUserById(req, res, next)
    {
        try
        {
            const id = req.params.id;
            await usersService.deleteUserById(id);
            res.status(200).send("user deleted");
        }catch(err)
        {
            next(err);
        }
    }

    async patchUserById(req, res, next)
    {
        try
        {
            const updates = req.body;
            const id = req.params.id;
            const result =  await usersService.patchUserById(updates, id);
            res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }

    async putUserById(req, res, next)
    {
        try
        {
            const updates = req.body;
            const id = req.params.id;
            const result = await usersService.putUserById(updates, id);
            res.status(200).send(result);
        }catch(err)
        {
            next(err);
        }
    }
}

export default new UserController();