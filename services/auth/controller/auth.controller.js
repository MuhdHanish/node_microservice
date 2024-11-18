import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";

class AuthController {
    static async register(req, res) {
        try {
            let { email, password, name } = req.body;
            if (!email || !password || !name) {
                return res.status(400).json({ message: "name, email and password are required!" });
            }
            const salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            return res.status(201).json({ message: "Account created sucessfully!", user });
        } catch (error) {
            if (error.code === "P2002" && error.meta?.target.includes("email")) {
                return res.status(409).json({ message: "Email already registered!" });
            }
            return res.status(500).json({ message: "Something went wrong, plesae try again." });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "email and password are required!" });
            }
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: "Invalid credentials!" });
            }
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            return res.status(200).json({ message: "Login successful!", token: `Bearer ${token}` });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again.", error: error?.message || "Unexpected error." });
        }
    }
    static async user(req, res) {
        try {
            const user = req.user;
            return res.json({ user });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again.", error: error?.message || "Unexpected error." });
        }
    }
}

export default AuthController;