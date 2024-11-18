import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {                              
        const authHeader = req.headers.authorization; 
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.user = payload;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, please try agian." });
    }
};

export default authMiddleware;
