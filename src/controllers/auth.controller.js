import authService from "../services/auth.service.js";
import express from "express";

class AuthController {
    async signup(req, res, next)
    {
        try{
            await authService.signUp(req.body);
            res.status(200).json({ok: true, message: "new user created"});
        }catch(err)
        {
            next(err);
        }
    }

    async signIn(req, res, next)
    {
        try{
            const token = await authService.signIn(req.body);
            res.status(200).json({ok: true, message: "signed in successfully", token: token});
        }catch(err)
        {
            next(err)
        }
    }
}

export default new AuthController();