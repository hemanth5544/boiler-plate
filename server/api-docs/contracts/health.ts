import { initContract } from "@ts-rest/core";
import { ZHealthResponse } from "@zod/Health/health";

const c = initContract();

export const healthContract = c.router({
	getHealth: {
		summary: "Get health",
		path: "/status",
		method: "GET",
		description: "Get health status",
		responses: {
			200: ZHealthResponse,
		},
	},
});
