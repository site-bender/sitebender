import type Logger from "../../types/Logger/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createSilentLogger(): Logger {
	return {
		log: (_message: string) => {},
		warn: (_message: string) => {},
		error: (_message: string) => {},
		info: (_message: string) => {},
	}
}
