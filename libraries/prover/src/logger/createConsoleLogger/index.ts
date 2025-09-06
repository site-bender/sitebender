import type Logger from "../../types/Logger/index.ts"

/**
 * Creates a default logger that outputs to console
 * @returns Logger instance using console methods
 */
export default function createConsoleLogger(): Logger {
	return {
		log: (message: string) => console.log(message),
		warn: (message: string) => console.warn(message),
		error: (message: string) => console.error(message),
		info: (message: string) => console.info(message),
	}
}