import express from "express";
import usersRouter from "./src/routes/users.routes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", usersRouter);

export default app;