import repeat from "../repeat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const padEndTo =
	(chars: string) => (targetLength: number) => (str: string): string =>
		`${str}${repeat(chars)(Math.max(0, targetLength - str.length))}`

export default padEndTo
