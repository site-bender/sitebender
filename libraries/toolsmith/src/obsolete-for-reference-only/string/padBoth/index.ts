import repeat from "../repeat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const padBoth = (chars: string) => (count: number) => (str: string): string => {
	const padding = repeat(chars)(Math.max(0, count))
	return `${padding}${str}${padding}`
}

export default padBoth
