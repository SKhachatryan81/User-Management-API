import express from "express";
import dotenv from "dotenv/config";
import fs from "fs/promises";
import { json } from "stream/consumers";
import { delUserById, getUserById, getUsers, patchUserById, postNewUser, putUserById } from "./lib/lib.js";

const app = express();
app.use(express.json());

// const PORT = process.env.PORT;
const PORT = 5001;



app.listen(PORT, () => {
  console.log("Ther server is listening...\n");
});

app.get("/", (req, res) => {
  res.send("test");
});

app.get("/users", getUsers());

app.get("/users/:id", getUserById());

app.post("/users", postNewUser());

app.patch("/users/:id", patchUserById());

app.put("/users/:id", putUserById());

app.delete("/users/:id", delUserById());