import express from "express";
import { userHandler } from "@handlers/user.Handler";

const router = express.Router();

router.get("/:id", userHandler.getUser);

export default router;
