import express from "express";
import { connection  } from "./database.service.js";


export async function getAllUsers()
{
    const [rows] = await connection.query("SELECT * FROM users");
    return rows;
}

export async function getUserById(id)
{
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

export async function postNewUser(name, age, occupation, username)
{
    await connection.query("INSERT INTO users(name, age, occupation, username) VALUES(?, ?, ?, ?)",
        [name, age, occupation, username]);
}

export async function deleteUserById(id)
{
    await connection.query("DELETE FROM users WHERE id = ?", [id]);
}

export async function patchUserById(updates, id)
{
    const allFields = ["name", "age", "occupation", "username"];

    const fileds = [];
    const values = [];

    for(const key of allFields)
    {
        if(updates[key] !== undefined)
        {
            fileds.push(`${key} = ?`);
            values.push(updates[key]);
        }
    }

    if(fileds.length === 0)
    {
        return;
    }

    const sql = `
        UPDATE users
        SET ${fileds.join(", ")}
        WHERE id = ?`;

    values.push(id);

    const [result] = await connection.query(sql, values);
    return `affected rows: ${result.affectedRows}`;
}

export async function putUserById(updates, id)
{
    const allFields = ["name", "age", "occupation", "username"];

    const fileds = [];
    const values = [];

    for(const key of allFields)
    {
        if(updates[key] === undefined)
        {
            return "empty filed(s)";
        }
        fileds.push(`${key} = ?`);
        values.push(updates[key]);
    }

    values.push(id);

    const sql = `
        UPDATE users
        SET ${fileds.join(", ")}
        WHERE id = ?`;

    const [result] = await connection.query(sql, values);
    return `affected rows: ${result.affectedRows}`;
}