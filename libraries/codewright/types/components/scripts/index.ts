export type Logger = {
	error: (...args: unknown[]) => void
	info: (...args: unknown[]) => void
	log: (...args: unknown[]) => void
	warn: (...args: unknown[]) => void
}

export type ServerOptions = {
	port?: number
}

export * from "./Logger/index.ts"
