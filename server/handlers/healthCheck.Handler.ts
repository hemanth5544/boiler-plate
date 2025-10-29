import { Request, Response } from "express";
import { logger } from "@logger/logger";
import { ZHealthResponse } from "@zod/Health/health";
import { utilService } from "@services/util.services";

export const healthCheckHandler = {
	async checkHealth(req: Request, res: Response) {
		try {
			const result = await utilService.performHealthCheck();

			const validation = ZHealthResponse.safeParse(result);

			if (!validation.success) {
				logger.error(
					"Health check response validation failed:",
					validation.error,
				);
				return res.status(500).json({
					status: "unhealthy",
					error: "Invalid health check response format",
					details: validation.error.errors,
				});
			}

			res.status(200).json(validation.data);
		} catch (error: any) {
			logger.error(`Health check failed: ${error.message}`);
			res.status(500).json({ error: "Health check failed" });
		}
	},
};
