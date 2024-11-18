import cors from "cors";
import express from "express";
import { config } from "dotenv";

config();

const app = express();
f
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
    return res.json({ message: "Auth Service Wroking" });
})

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Auth Service started on port ${PORT}`);
})