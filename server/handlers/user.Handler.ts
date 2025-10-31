import type { Request, Response } from "express";
import { userService } from "@services/user.services";
import { logger } from "@logger/logger";
import { ZUser } from "@zod/User/user";

export const userHandler = {
	async getUser(req: Request, res: Response) {
		try {
			const { id } = ZUser.parse(req.params);
			const user = await userService.getUserById(id);
			res.status(200).json({ success: true, data: user });
		} catch (error: any) {
			logger.error(`Error fetching user: ${error.message}`);
			res.status(400).json({ success: false, message: error.message });
		}
	},

	async getUsers(_req: Request, res: Response) {
		try {
			const user = await userService.getUsers();
			res.status(200).json({ success: true, data: user });
		} catch (error: any) {
			logger.error(`Error fetching users: ${error}`);
			res.status(400).json({ success: false, message: error.message });
		}
	},
};
