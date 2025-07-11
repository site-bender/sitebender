export type Logger = {
	error: (...args: any[]) => void
	info: (...args: any[]) => void
	log: (...args: any[]) => void
	warn: (...args: any[]) => void
}

export type ServerOptions = {
	port?: number
}

export * from "./Logger/index.ts"
