import { Request, Response } from "express";
import { z } from "zod";
import { userService } from "@services/userServices";
import { logger } from "@logger/logger";

const userIdSchema = z.object({
	id: z.string().regex(/^\d+$/).transform(Number),
});

export const userHandler = {
	async getUser(req: Request, res: Response) {
		try {
			const { id } = userIdSchema.parse(req.params);
			const user = await userService.getUserById(id);
			res.status(200).json({ success: true, data: user });
		} catch (error: any) {
			logger.error(`Error fetching user: ${error.message}`);
			res.status(400).json({ success: false, message: error.message });
		}
	},
};
