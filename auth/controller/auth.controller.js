import bcrypt from "bcryptjs";
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
            const { password: _, ...rest } = user;
            return res.status(200).json({ message: "Login successful!", user: rest });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again." });
        }
    }
}

export default AuthController;