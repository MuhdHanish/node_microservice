import prisma from "../config/db.config.js";

class PostController {
    static async posts(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            const postsWithUsers = await Promise.all(
                posts.map(async (post) => {
                    try {
                        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/user/${post?.user_id}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch user info for user_id: ${post?.user_id}`);
                        }
                        const data = await response.json();
                        return {
                            ...post,
                            user_id: data?.user || null,
                        };
                    } catch (error) {
                        return {
                            ...post,
                            user_id: null, 
                        };
                    }
                })
            );
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