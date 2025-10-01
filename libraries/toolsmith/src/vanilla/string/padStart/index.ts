import repeat from "../repeat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const padStart = (chars: string) => (count: number) => (str: string): string =>
	`${repeat(chars)(Math.max(0, count))}${str}`

export default padStart
