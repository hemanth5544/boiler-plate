import { initContract } from "@ts-rest/core";
import { ZUserResponse, ZUsersResponse } from "../../../zod/User/user";
import { z } from "zod";

const c = initContract();

export const userContract = c.router({
	getUser: {
		summary: "Get user",
		path: "/users/:id",
		method: "GET",
		description: "Get user by ID",
		responses: {
			200: ZUserResponse,
			404: z.object({ message: z.string() }),
		},
	},
	getUsers: {
		summary: "Get users",
		path: "/users",
		method: "GET",
		description: "Get all users",
		responses: {
			200: ZUsersResponse,
		},
	},
});
