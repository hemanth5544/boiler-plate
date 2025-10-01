import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export * from "./Health/health";

