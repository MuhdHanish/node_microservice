import prisma from "../config/db.config.js";

class PostController {
    static async posts(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            return res.json({ posts });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again." });
        }
    }
    static async create(req, res) {
        try {
            const user = req.user;
            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({ message: "title and content are required!" });
            }
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    user_id: user?.id
                }
            });
            return res.status(201).json({ message: "Post created successfully!", post });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again." });
        }
    }
}

export default PostController;