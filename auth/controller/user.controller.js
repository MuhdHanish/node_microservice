import prisma from "../config/db.config.js";

class UserController {
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id }
            });
            if (!user) {
                return res.status(401).json({ message: "User not found." });
            }
            const { password: _, ...rest } = user;
            return res.json({ user: rest });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again." });
        }
    }
}

export default UserController;