import { initContract } from "@ts-rest/core";
import { healthContract } from "./health";
import { userContract } from "./users";

const c = initContract();

export const apiContract = c.router({
	Health: healthContract,
	Users: userContract,
});
