import { userRepo } from "@repository/userRepo";
import { logger } from "@logger/logger";

export const userService = {
  async getUserById(id: number) {
    if (!id || isNaN(id)) {
      throw new Error("Invalid user ID");
    }

    const user = await userRepo.findById(id);

    if (!user) {
      logger.warn(`User not found: ${id}`);
      throw new Error("User not found");
    }

    logger.info(`Fetched user ${id}`);
    return user;
  },
};
