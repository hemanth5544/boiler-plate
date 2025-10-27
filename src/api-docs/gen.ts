import fs from "node:fs";

import { OpenAPI } from "./index";

const replaceCustomFileTypesToOpenApiCompatible = (
	jsonString: string,
): string => {
	const searchPattern =
		/{"type":"object","properties":{"type":{"type":"string","enum":\["file"\]}},\s*"required":\["type"\]}/g;
	const replacement = `{"type":"string","format":"binary"}`;

	return jsonString.replace(searchPattern, replacement);
};

const filteredDoc = replaceCustomFileTypesToOpenApiCompatible(
	JSON.stringify(OpenAPI),
);

const formattedDoc = JSON.parse(filteredDoc);

const filePaths = ["./openapi.json", "../src/openapi.json"];

filePaths.forEach((filePath) => {
	fs.writeFile(filePath, JSON.stringify(formattedDoc, null, 2), (err) => {
		if (err) {
			console.error(`Error writing to ${filePath}:`, err);
		}
	});
});
