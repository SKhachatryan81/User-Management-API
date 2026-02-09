import express from "express";
import { sequelize } from "../config/db.js";
import { db } from "../config/index.js";
import hashService from "./hash.service.js";
import jwtService from "./jwt.service.js"
import userModel from "../models/user.model.js";
import passwordService from "./password.service.js";


class AuthService {
    async signUp(userdata)
    {
        return await db.userModel.create(userdata);
    } 

    async signIn(userdata)
    {
        const { username, password } = userdata;

        const user = await db.userModel.findOne({ where: { username }});

        await passwordService.handleSigninAttempt(user, password);
        
        const jwtToken = jwtService.sign(user.id);
        
        return jwtToken;
    }
}

export default new AuthService();