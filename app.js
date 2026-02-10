import express from "express";
import usersRouter from "./src/routes/user.routes.js";
import postsRouter from "./src/routes/post.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import { db } from "./src/config/index.js";
import { globalErrorHandler } from "./src/error-handlers/globalErrorHandler.js";
import { tokenValidator } from "./src/middleware/token.validator.js";



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync({alter: true}).then();

app.use("/api/auth", authRouter);

app.use(tokenValidator);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

// app.use("/api/auth/refresh", )


app.use((req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    throw error;
})

app.use(globalErrorHandler);



export default app;