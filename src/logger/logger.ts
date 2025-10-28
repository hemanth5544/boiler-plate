import winston from "winston";
import config from "../config/config";

const logLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
		silly: 6,
	},
	colors: {
		error: "red",
		warn: "yellow",
		info: "green",
		http: "magenta",
		verbose: "cyan",
		debug: "blue",
		silly: "grey",
	},
};

export const logger = winston.createLogger({
	levels: logLevels.levels,
	transports: [
		new winston.transports.Console({
			level: config.OBSERVABILITY_LOGGING_LEVEL || "debug",
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),

		new winston.transports.File({
			filename: "logs/app.log",
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),

		new winston.transports.File({
			filename: "logs/http_requests.log",
			level: "http",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),
	],
	exitOnError: false,
});

winston.addColors(logLevels.colors);
