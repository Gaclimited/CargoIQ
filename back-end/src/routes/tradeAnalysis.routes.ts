import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import {
    analyze,
    getAllAnalyses,
    getAnalysisById,
    removeAnalysis,
} from "../controllers/tradeAnalysis.controller";
import {
    createTradeAnalysisSchema,
    getAnalysisByIdSchema,
    deleteAnalysisSchema,
} from "../utils/validators/tradeAnalysis.validator";

const router = Router();

router.use(protect);

router.post("/analyze", validate(createTradeAnalysisSchema), analyze);
router.get("/analysis", getAllAnalyses);
router.get("/analysis/:id", validate(getAnalysisByIdSchema), getAnalysisById);
router.delete("/analysis/:id", validate(deleteAnalysisSchema), removeAnalysis);

export default router;