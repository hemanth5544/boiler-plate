import { Sequelize } from "sequelize";
import config from "@config/config";
import { logger } from "@logger/logger";

class Database {
	private static instance: Sequelize;

	private constructor() {}

	public static getInstance(): Sequelize {
		if (!Database.instance) {
			try {
				Database.instance = new Sequelize(
					config.DATABASE_NAME,
					config.DATABASE_USER,
					config.DATABASE_PASSWORD,
					{
						host: config.DATABASE_HOST,
						dialect: "postgres",
						port: config.DATABASE_PORT,
					},
				);

				Database.instance
					.authenticate()
					.then(() => {
						logger.info(
							"Database connection has been established successfully.",
						);
					})
					.catch((error) => {
						logger.error("Unable to connect to the database:", error);
						process.exit(1);
					});
			} catch (error) {
				logger.error("Error initializing Sequelize:", error);
				process.exit(1);
			}
		}
		return Database.instance;
	}
}

export default Database;
