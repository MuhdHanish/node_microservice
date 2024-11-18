import prisma from "../config/db.config.js";

class PostController {
    static async posts(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            const userIds = posts.map((post) => post?.user_id);
            const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/user/users-by-ids`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: userIds }),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch users by IDs`);
            }
            const data = await response.json();
            const users = {};
            data?.users?.forEach(user => {
                users[user?.id] = user;
            });
            const postsWithUsers = posts?.map((post) => {
                return {
                    ...post,
                    user_id: users[post?.user_id]
                };
            })
            return res.json({ posts: postsWithUsers });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong, plesae try again.", error: error?.message || "Unexpected error." });
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
            return res.status(500).json({ message: "Something went wrong, plesae try again.", error: error?.message || "Unexpected error." });
        }
    }
}

export default PostController;