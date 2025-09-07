import type Logger from "../../types/Logger/index.ts"

/**
 * Creates a silent logger that discards all output
 * @returns Logger instance that does nothing
 */
export default function createSilentLogger(): Logger {
	return {
		log: (_message: string) => {},
		warn: (_message: string) => {},
		error: (_message: string) => {},
		info: (_message: string) => {},
	}
}
