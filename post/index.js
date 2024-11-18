import cors from "cors";
import express from "express";
import { config } from "dotenv";

config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
    return res.json({ message: "Post Service Wroking." });
});

// Routes
// import Routes from "./routes/index.js";
// app.use("/api", Routes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Post Service started on port ${PORT}`);
});