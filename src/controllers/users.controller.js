import express from "express"
import * as usersService from "../services/users.service.js"
import { connection } from "../services/database.service.js";

export async function getAllUsers(req, res, next)
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

export async function getUserById(req, res, next)
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

export async function postNewUser(req, res, next)
{
    try
    {
        const { name, age, occupation, username} = req.body;
        await usersService.postNewUser(name, age, occupation, username);
        res.status(200).send("new user created\n");
    }catch(err)
    {
        next(err);
    }
}

export async function deleteUserById(req, res, next)
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

export async function patchUserById(req, res, next)
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

export async function putUserById(req, res, next)
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