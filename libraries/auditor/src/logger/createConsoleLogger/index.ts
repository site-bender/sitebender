import type Logger from "../../types/Logger/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createConsoleLogger(): Logger {
	return {
		log: (message: string) => console.log(message),
		warn: (message: string) => console.warn(message),
		error: (message: string) => console.error(message),
		info: (message: string) => console.info(message),
	}
}
