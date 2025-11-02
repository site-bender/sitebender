export interface Logger {
	log: (...args: unknown[]) => void
	info: (...args: unknown[]) => void
	warn: (...args: unknown[]) => void
	error: (...args: unknown[]) => void
}

export const defaultLogger: Logger = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
}
