import express from "express";
import dotenv from "dotenv/config";
import app from "./app.js";


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Ther server is listening...\n");
});


