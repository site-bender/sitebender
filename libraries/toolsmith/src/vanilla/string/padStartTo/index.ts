import repeat from "../repeat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const padStartTo =
	(chars: string) => (targetLength: number) => (str: string): string =>
		`${repeat(chars)(Math.max(0, targetLength - str.length))}${str}`

export default padStartTo
