import type { ErrorConfig } from "../../../types/error/index.ts"

export const Error =
	(operation: string) => (type: string) => (message: string): ErrorConfig => ({
		tag: "Error",
		message,
		operation,
		type,
	})

export default Error
