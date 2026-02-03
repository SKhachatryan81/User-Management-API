import express from "express";
import usersRouter from "./src/routes/user.routes.js";
import postsRouter from "./src/routes/post.routes.js"
import { db } from "./src/config/index.js"


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync({alter: true}).then();

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);



export default app;