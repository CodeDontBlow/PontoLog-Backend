import { Router } from "express";
import ExpController from "../controllers/exp.controller";

const router = Router();
router.get("/sh2/:letter", ExpController.getDataByLetter("NO_SH2_POR", "sh2 retrieved successfully"));
router.get("/sh6/:letter", ExpController.getDataByLetter("NO_SH6_POR", "sh6 retrieved successfully"));
router.get("/sh4/:letter", ExpController.getDataByLetter("NO_SH4_POR", "sh4 retrieved successfully"));
export default router;
