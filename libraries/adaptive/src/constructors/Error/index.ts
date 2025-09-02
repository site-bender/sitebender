import type { ErrorConfig } from "@adaptiveTypes/error/index.ts"

export const Error =
	(operation: string) => (type: string) => (message: string): ErrorConfig => ({
		tag: "Error",
		message,
		operation,
		type,
	})

export default Error
