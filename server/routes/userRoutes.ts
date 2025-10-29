import express from "express";
import { userHandler } from "@handlers/user.Handler";

const router = express.Router();

router.get("/user/:id", userHandler.getUser);
router.get("/users", userHandler.getUsers);

export default router;
