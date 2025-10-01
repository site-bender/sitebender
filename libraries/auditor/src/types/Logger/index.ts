//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type Logger = {
	log: (message: string) => void
	warn: (message: string) => void
	error: (message: string) => void
	info: (message: string) => void
}

export default Logger
