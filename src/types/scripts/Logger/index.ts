export interface Logger {
	log: (...args: any[]) => void
	info: (...args: any[]) => void
	warn: (...args: any[]) => void
	error: (...args: any[]) => void
}

export const defaultLogger: Logger = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
}
