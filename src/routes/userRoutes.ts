import express from "express";
import { userHandler } from "@handlers/userHandler";

const router = express.Router();

router.get("/:id", userHandler.getUser);

export default router;
