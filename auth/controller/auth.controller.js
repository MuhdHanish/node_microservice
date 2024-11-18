import bcrypt from "bcryptjs";
import prisma from "../config/db.config.js";

class AuthController {
    static async register(req, res) {
        try {
            const payload = req.body;
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            const user = await prisma.user.create({
                data: payload
            });
            return res.status(201).json({ message: "Account created sucessfully!", user });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again." });
        }
    }
}

export default AuthController;