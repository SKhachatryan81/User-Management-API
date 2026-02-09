import express from "express";
import authValidator from "../middleware/auth.validator.js";
import userValidator from "../middleware/user.validator.js";
import authController from "../controllers/auth.controller.js";
import hashTransformator from "../middleware/hash.transform.js";


const authRouter = express.Router();

authRouter.post("/signup", 
    [authValidator.signUpParams, authValidator.uniqueAuth, authValidator.checkPassword, hashTransformator.hashTransform],
    authController.signup
);

authRouter.post("/signin", 
    [authValidator.signInParams, authValidator.userExist],
    authController.signIn
);

export default authRouter;