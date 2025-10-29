import express from "express";
import { healthCheckHandler } from "@handlers/healthCheck.Handler";
const router = express.Router();
router.get("/status", healthCheckHandler.checkHealth);

export default router;
