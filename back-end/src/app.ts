import express, { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Server is running." });
});

// Routes will be mounted here in later steps, e.g.:
// app.use("/", authRoutes);
// app.use("/analyze", tradeAnalysisRoutes);
// app.use("/analysis", tradeAnalysisRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;