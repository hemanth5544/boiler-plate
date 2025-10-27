import express from "express";
import { apiReference } from "@scalar/express-api-reference";
import fs from "node:fs";
import path from "node:path";
import config from "./config/config";
import logger from "./logger/logger";
import Database from "./database/database";
import { globalErrorHandler, } from "./errs/http";

const _sequelize = Database.getInstance();
const app = express();
const openApiSpecPath = path.join(__dirname, "..", "openapi.json");
const OpenApiSpecification = JSON.parse(
	fs.readFileSync(openApiSpecPath, "utf-8"),
);
app.use(
	"/reference",
	apiReference({
		spec: {
			content: OpenApiSpecification,
		},
	}),
);
app.use(globalErrorHandler);

app.get("/api/hello", (_req, res) => {
	try {
		res.json({ message: "Hello, world!" });
	} catch (_error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(config.SERVER_PORT, () => {
	logger.info(`Server is running on http://localhost:${config.SERVER_PORT}`);
	logger.info(
		`API Reference is available at http://localhost:${config.SERVER_PORT}/reference`,
	);
});
