import express from "express";
import dotenv from "dotenv/config";
import fs from "fs/promises";
import { json } from "stream/consumers";

class User{
    constructor(name, age, occupation, username){
        this.id = "";
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.username = username;
    }
}

function dataReader()
{
    let users = null;
    return async function()
    {
        if(users)
        {
            return users;
        }
        const data = await fs.readFile("./data_base/users.json", "utf-8");
        users = JSON.parse(data);
        return users;
    }
}

const data = dataReader();

export function getUsers() 
{
    return async (req, res) => {
        try
        {
            const users = await data();
            res.status(200).send(users);
        }catch(err)
        {
            console.error(err);
            res.status(404).send({ error: 'Failed to find users' });
        }
    }
}

export function getUserById() 
{
    return async (req, res) => {
        const id = Number(req.params.id);
        try
        {
            const users = await data();
            const user = users.find( (user) => user["id"] === id)
            if(user)
            {
                res.status(200).send(user);

            }else{
                res.status(404).send({ error: 'Failed to find user' });
            }
        }catch(err)
        {
            console.error(err);
        }
    }
}

export function postNewUser()
{
    return async (req, res) => {
        const { name, age, occupation, username} = req.body;
        try
        {
            const users = await data();

            let firstFreeId = 1;
            while(users.some( (user) => user.id === firstFreeId))
            {
                firstFreeId++;
            }

            const newUser = new User(name, age, occupation, username);
            newUser.id = firstFreeId;

            users.push(newUser);
            const newData = JSON.stringify(users, null, 2);
            await fs.writeFile("./data_base/users.json", newData, "utf-8");
            res.status(201).send("user created");
        }catch
        {
            res.status(400).send({ error: "Bad request" });
        }
    }
}

export function patchUserById()
{
    return async (req, res) => {
        const { name, age, occupation, username} = req.body;
        const id = Number(req.params.id);
        try
        {
            const users = await data();
            const user = users.find( (user) => user["id"] === id);
            if(!user)
            {
                res.status(404).send({ error: 'Failed to find user' });
                return;
            }
            const updatedUser = {
                ...user,
                name: name ?? user.name,
                age: age ?? user.age,
                occupation: occupation ?? user.occupation,
                username: username ?? user.username
            }
            Object.assign(user, updatedUser);
            const newData = JSON.stringify(users, null, 2);
            await fs.writeFile("./data_base/users.json", newData, "utf-8");
            res.status(200).send("user updated");
        }catch
        {
            res.send(500).send({ error: "Internal server error" });
        }
    }
}

export function putUserById()
{
    return async (req, res) => {
        try{
            const { name, age, occupation, username} = req.body;
            if([name, age, occupation, username].some( (field) => field === undefined))
            {
                res.status(400).send("Bad request: missing field(s)");
                return;
            }

            const id = Number(req.params.id);
            const users = await data();
            const user = users.find( (user) => user["id"] === id);
            if(!user)
            {
                res.status(404).send("user not found");
                return;
            }
            const updatedUser = {
                ...user,
                name: name,
                age: age,
                occupation: occupation,
                username: username
            }
            Object.assign(user, updatedUser);

            const newData = JSON.stringify(users, null, 2);
            await fs.writeFile("./data_base/users.json", newData, "utf-8");
            res.status(200).send("user updated");
        }catch(err)
        {
            res.send(500).send({ error: "Internal server error" });
        }
    }
}

export function delUserById()
{
    return async (req, res) => {
        const id = Number(req.params.id);
        try
        {
            const users = await data();
            const user = users.find( (user) => user["id"] === id);
            if(!user)
            {
                res.status(404).send("user not found");
            }
            const index = users.indexOf(user);
            if(index !== -1)
            {
                users.splice(index, 1);
            }

            const newData = JSON.stringify(users, null, 2);
            await fs.writeFile("./data_base/users.json", newData, "utf-8");

            res.status(200).send("user deleted");
        }catch(err)
        {
            res.send(500).send({ error: "Internal server error" });
        }
    }
}