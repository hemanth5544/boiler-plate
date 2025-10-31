import { UserRepo } from "@repository/user.repository";
import { logger } from "@logger/logger";

export class userService {
	static async getUserById(id: number) {
		if (!id || Number.isNaN(id)) {
			throw new Error("Invalid user ID");
		}

		const user = await UserRepo.findById(id);

		if (!user) {
			logger.warn(`User not found: ${id}`);
			return null;
		}

		logger.info(`Fetched user ${id}`);
		return user;
	}
	static async getUsers() {
		const users = await UserRepo.getAllUsers();
		if (!users) {
			logger.warn(`Users not found`);
			return null;
		}
		return users;
	}
}
