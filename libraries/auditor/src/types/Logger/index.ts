/**
 * Logger interface for dependency injection
 */
type Logger = {
	log: (message: string) => void
	warn: (message: string) => void
	error: (message: string) => void
	info: (message: string) => void
}

export default Logger
