import app from "./app";
import { env } from "./config/env";

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running"
    });
});

app.listen(env.PORT, () => {
    console.log(`🚀 Server running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`);
});