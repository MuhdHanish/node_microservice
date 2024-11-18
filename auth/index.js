import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get(`/`, (req, res) => {
    return res.json({ message: "Auth Service Wroking" });
})

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Auth Service started on port ${PORT}`);
})