// error.ts
import logger from "../logger/logger";

class AppError extends Error {
	statusCode: number;
	isOperational: boolean;

	constructor(
		message: string,
		statusCode: number,
		isOperational: boolean = true,
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

export const globalErrorHandler = (
	err: AppError,
	_req: any,
	res: any,
	_next: any,
) => {
	if (!err.isOperational) {
		logger.error("Critical Error:", err);
	}

	res.status(err.statusCode || 500).json({
		status: "error",
		message: err.message,
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
};

export const throwError = (message: string, statusCode: number) => {
	throw new AppError(message, statusCode);
};
