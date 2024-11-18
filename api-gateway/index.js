import express from "express";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());

const SERVICES = {
    user: "http://localhost:8001", // User Service
    post: "http://localhost:8002", // Post Service
};

app.all("/:service/*", async (req, res) => {
    const { service } = req.params;
    const serviceUrl = SERVICES[service];
    if (!serviceUrl) {
        return res.status(404).json({ message: `Service '${service}' not found.` });
    }

    const targetUrl = `${serviceUrl}/${req.params[0]}`;

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: null, 
                "Content-Type": req.is("application/json") ? "application/json" : req.get("Content-Type"),
            },
            body: ["GET", "DELETE"].includes(req.method) ? undefined : JSON.stringify(req.body),
        });

        const body = response.headers.get("content-type")?.includes("application/json")
            ? await response.json()
            : await response.text();

        res.status(response.status).send(body);
    } catch (error) {
        res.status(500).json({
            message: "Error forwarding request to service",
            error: error.message,
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
