import { Router } from "express";
import { validateAnomaly , getStats} from "../controllers/dnaController";

const router: Router = Router();

router.post("/validate-anomaly", validateAnomaly);
router.get("/stats", getStats);

export default router;
