import repeat from "../repeat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const padEnd = (chars: string) => (count: number) => (str: string): string =>
	`${str}${repeat(chars)(Math.max(0, count))}`

export default padEnd
